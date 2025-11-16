import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WizardProgress from "./WizardProgress";
import Step1 from "./wizard-steps/Step1";
import Step2 from "./wizard-steps/Step2";
import Step4 from "./wizard-steps/Step4";
import Step5 from "./wizard-steps/Step5";
import Step6 from "./wizard-steps/Step6";
import ThankYouPage from "./wizard-steps/ThankYouPage";
import { 
  trackPopupDisplay, 
  trackPopupInteraction, 
  trackPopupStep, 
  trackGenerateLead 
} from "@/utils/analytics";
import { notifyParentToClose } from "@/utils/parentMessaging";
import { validateFirstWebhook, validateSecondWebhook } from "@/utils/formValidation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { checkClientRateLimit } from "@/utils/rateLimiting";
import { 
  createHoneypotFields, 
  detectBot, 
  prepareBotDetectionData,
  type HoneypotFields 
} from "@/utils/botDetection";

const DISMISSED_KEY = "rockPopupDismissed";
export interface WizardFormData {
  step1: string;
  step2: string;
  step3: {
    name: string;
    gradeLevel: string;
  }[];
  step4ParentGuide: string;
  step4Questions: string;
  step5ParentName: string;
  step5Email: string;
  step5Phone: string;
}
const WizardModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [requestId] = useState(() => crypto.randomUUID());
  const [webhookHtml, setWebhookHtml] = useState<string>("");
  const [webhookLoading, setWebhookLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [formStartTime] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState<HoneypotFields>(createHoneypotFields());
  const [formData, setFormData] = useState<WizardFormData>({
    step1: "",
    step2: "",
    step3: [{
      name: "",
      gradeLevel: ""
    }],
    step4ParentGuide: "",
    step4Questions: "",
    step5ParentName: "",
    step5Email: "",
    step5Phone: ""
  });
  useEffect(() => {
    // Check for reset/force show parameter from URL or parent config
    const urlParams = new URLSearchParams(window.location.search);
    const urlForceShow = urlParams.get('forceShow') === 'true' || urlParams.get('reset') === 'true';
    const config = window.rockPopupConfig || {};
    const configForceShow = (config as any).forceShow === true || (config as any).reset === true;
    const forceShow = urlForceShow || configForceShow;
    
    // If force show parameter is present, clear dismissed state
    if (forceShow) {
      localStorage.removeItem(DISMISSED_KEY);
      document.body.classList.remove('popup-dismissed');
    }
    
    // Detect if running in iframe and add class to body
    const isIframe = window.self !== window.top;
    if (isIframe) {
      document.body.classList.add('iframe-mode');
    }
    
    const flag = localStorage.getItem(DISMISSED_KEY);
    if (flag === "1" && !forceShow) {
      setDismissed(true);
      // Mark body as dismissed for styling
      document.body.classList.add('popup-dismissed');
      // Notify parent immediately to remove iframe since popup was already dismissed
      notifyParentToClose();
    } else {
      setOpen(true);
      // Track popup display when it opens
      const pageLocation = window.rockPopupConfig?.pageLocation || window.location.href;
      trackPopupDisplay(pageLocation);
    }
  }, []);
  const handleClose = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
    setOpen(false);
    
    // Add class to body to make everything transparent and non-interactive
    document.body.classList.add('popup-dismissed');
    
    // Notify parent window to remove iframe (if embedded)
    notifyParentToClose();
  };
  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackPopupInteraction();
    }
  };

  const handleNext = async () => {
    handleUserInteraction();

    // If moving from step 4 to step 5, fire first webhook (fire and forget)
    if (currentStep === 4) {
      // Check for bot behavior
      const botCheck = detectBot(honeypot, formStartTime);
      if (botCheck.isBot) {
        console.warn("Bot detected:", botCheck.reason);
        toast({
          title: "Submission Error",
          description: "Please try again or contact support if this persists.",
          variant: "destructive"
        });
        return;
      }

      // Check client-side rate limiting
      const rateLimitCheck = checkClientRateLimit();
      if (!rateLimitCheck.allowed) {
        toast({
          title: "Please Slow Down",
          description: `You're submitting too quickly. Please wait ${rateLimitCheck.waitTime} seconds.`,
          variant: "destructive"
        });
        return;
      }

      // Validate data before sending to webhook
      try {
        const validatedData = validateFirstWebhook({
          request_id: requestId,
          step1: formData.step1,
          step2: formData.step2,
          step3: formData.step3,
          step4ParentGuide: formData.step4ParentGuide,
          step4Questions: formData.step4Questions
        });

        const botDetectionData = prepareBotDetectionData(honeypot, formStartTime);

        // Call edge function instead of direct webhook
        supabase.functions.invoke('submit-form', {
          body: {
            step: 'first',
            formData: validatedData,
            botDetection: botDetectionData
          }
        }).catch(error => {
          console.error("First webhook error");
        });
      } catch (error) {
        // Validation failed - show error but allow progression
        console.error("Validation error:", error);
        toast({
          title: "Validation Warning",
          description: "Some form data may be invalid. Please check your entries.",
          variant: "destructive"
        });
      }

      // Immediately advance to next step
      setCurrentStep(5);
      return;
    }

    // If moving from step 5 to step 6, advance immediately and call second webhook
    if (currentStep === 5) {
      // Check for bot behavior
      const botCheck = detectBot(honeypot, formStartTime);
      if (botCheck.isBot) {
        console.warn("Bot detected:", botCheck.reason);
        toast({
          title: "Submission Error",
          description: "Please try again or contact support if this persists.",
          variant: "destructive"
        });
        return;
      }

      // Check client-side rate limiting
      const rateLimitCheck = checkClientRateLimit();
      if (!rateLimitCheck.allowed) {
        toast({
          title: "Please Slow Down",
          description: `You're submitting too quickly. Please wait ${rateLimitCheck.waitTime} seconds.`,
          variant: "destructive"
        });
        return;
      }

      setCurrentStep(6);
      setWebhookLoading(true);

      // Validate ALL form data before sending to webhook
      try {
        const validatedData = validateSecondWebhook({
          request_id: requestId,
          step1: formData.step1,
          step2: formData.step2,
          step3: formData.step3,
          step4ParentGuide: formData.step4ParentGuide,
          step4Questions: formData.step4Questions,
          step5ParentName: formData.step5ParentName,
          step5Email: formData.step5Email,
          step5Phone: formData.step5Phone
        });

        // Track generate_lead event after successful validation
        trackGenerateLead({
          parentName: validatedData.step5ParentName,
          email: validatedData.step5Email,
          phone: validatedData.step5Phone,
        });

        const botDetectionData = prepareBotDetectionData(honeypot, formStartTime);

        // Call edge function instead of direct webhook
        const { data, error } = await supabase.functions.invoke('submit-form', {
          body: {
            step: 'second',
            formData: validatedData,
            botDetection: botDetectionData
          }
        });
        
        if (error) {
          console.error("Edge function error:", error);
          setWebhookHtml("");
          toast({
            title: "Submission Error",
            description: "There was an issue submitting your information. Please try again.",
            variant: "destructive"
          });
        } else if (data?.success && data?.html) {
          setWebhookHtml(data.html);
        } else {
          setWebhookHtml("");
        }
      } catch (error) {
        console.error("Validation or webhook error:", error);
        setWebhookHtml("");
        toast({
          title: "Submission Error",
          description: "There was an issue submitting your information. Please verify all fields are correct.",
          variant: "destructive"
        });
      } finally {
        setWebhookLoading(false);
      }
      return;
    }

    // For all other steps, just advance normally
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.step1 !== "";
      case 2:
        return formData.step2 !== "";
      case 3:
        return formData.step3.length > 0 && formData.step3.every(child => child.name !== "" && child.gradeLevel !== "");
      case 4:
        return true; // step4Questions is optional
      case 5:
        return formData.step5ParentName !== "" && formData.step5Email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step5Email) && formData.step5Phone.replace(/\D/g, "").length === 10;
      default:
        return true;
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 
          value={formData.step1} 
          onChange={value => {
            updateFormData({ step1: value });
            handleUserInteraction();
          }} 
          onAutoAdvance={(selectedValue) => {
            trackPopupStep(1, selectedValue);
            handleNext();
          }} 
        />;
      case 2:
        return <Step2 
          value={formData.step2} 
          onChange={value => {
            updateFormData({ step2: value });
            handleUserInteraction();
          }} 
          onAutoAdvance={(selectedValue) => {
            trackPopupStep(2, selectedValue);
            handleNext();
          }} 
        />;
      case 3:
        return <Step4 
          value={formData.step3} 
          onChange={value => {
            updateFormData({ step3: value });
            handleUserInteraction();
          }} 
          onAutoAdvance={() => {
            trackPopupStep(3, undefined, {
              children_count: formData.step3.length,
              grade_levels: formData.step3.map(c => c.gradeLevel),
            });
            handleNext();
          }} 
        />;
      case 4:
        return <Step5 
          questions={formData.step4Questions} 
          onQuestionsChange={value => {
            updateFormData({ step4Questions: value });
            handleUserInteraction();
          }} 
          onAutoAdvance={() => {
            trackPopupStep(4, undefined, {
              has_questions: formData.step4Questions.trim().length > 0,
            });
            handleNext();
          }} 
        />;
      case 5:
        return <Step6 
          parentName={formData.step5ParentName} 
          email={formData.step5Email} 
          phone={formData.step5Phone} 
          onParentNameChange={value => {
            updateFormData({ step5ParentName: value });
            handleUserInteraction();
          }} 
          onEmailChange={value => {
            updateFormData({ step5Email: value });
            handleUserInteraction();
          }} 
          onPhoneChange={value => {
            updateFormData({ step5Phone: value });
            handleUserInteraction();
          }} 
          onAutoAdvance={() => {
            trackPopupStep(5);
            handleNext();
          }} 
        />;
      case 6:
        return <ThankYouPage formData={formData} onClose={handleClose} webhookHtml={webhookHtml} webhookLoading={webhookLoading} />;
      default:
        return null;
    }
  };
  if (dismissed || !open) {
    return null;
  }
  return <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className={`${currentStep === 6 ? 'max-w-full w-screen sm:w-[95vw] h-screen sm:h-[95vh]' : 'w-screen sm:max-w-[800px] h-screen sm:h-[500px]'} p-0 gap-0 bg-background border-0 overflow-hidden`}>
        <DialogTitle className="sr-only">Rock Academy Information Wizard</DialogTitle>
        <DialogDescription className="sr-only">
          Multi-step form to help determine if Rock Academy is right for your family
        </DialogDescription>
        
        <button onClick={handleClose} className="absolute right-4 top-4 z-50 rounded-sm bg-wizard-sidebar text-white p-1.5 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col sm:flex-row h-full">
          {/* Left Sidebar */}
          {currentStep < 6 && <div className="sm:w-[45%] bg-wizard-sidebar p-6 sm:p-8 lg:p-10 flex flex-col text-primary-foreground">
              <img src="/rock-logo.webp" alt="Rock Academy Logo" className={`h-12 sm:h-20 w-auto object-contain self-start ${currentStep === 1 ? 'mb-6 sm:mb-12' : 'mb-3 sm:mb-12'}`} />
              <div className={currentStep === 1 ? 'block' : 'hidden sm:block'}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5 leading-tight text-left">
                  Is the Rock Academy the right fit for you?
                </h1>
                <p className="text-base lg:text-xl opacity-90 text-left sm:text-xl">Get personalized answers in 30 seconds.</p>
              </div>
            </div>}

          {/* Right Content Area */}
          <div className={`${currentStep === 6 ? 'w-full' : 'sm:w-[55%]'} bg-background flex flex-col h-full`}>
            {currentStep < 6 && <div className={`${currentStep === 1 ? 'hidden sm:block' : 'block'} p-4 pt-4 sm:pt-12 border-b border-border shrink-0`}>
                <WizardProgress currentStep={currentStep} totalSteps={5} />
              </div>}

            <div className="flex-1 overflow-y-auto min-h-0">
              {currentStep === 6 ? renderStep() : <div className="p-4 sm:p-4 pt-2">{renderStep()}</div>}
            </div>

            {/* Honeypot fields - hidden from users but visible to bots */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
              <input 
                type="text" 
                name="website" 
                tabIndex={-1}
                autoComplete="off"
                value={honeypot.website}
                onChange={(e) => setHoneypot(prev => ({ ...prev, website: e.target.value }))}
              />
              <input 
                type="text" 
                name="company" 
                tabIndex={-1}
                autoComplete="off"
                value={honeypot.company}
                onChange={(e) => setHoneypot(prev => ({ ...prev, company: e.target.value }))}
              />
              <input 
                type="tel" 
                name="phone_backup" 
                tabIndex={-1}
                autoComplete="off"
                value={honeypot.phone_backup}
                onChange={(e) => setHoneypot(prev => ({ ...prev, phone_backup: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default WizardModal;