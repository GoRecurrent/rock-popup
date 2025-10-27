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
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [requestId] = useState(() => crypto.randomUUID());
  const [webhookHtml, setWebhookHtml] = useState<string>("");
  const [webhookLoading, setWebhookLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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
      // Fire and forget webhook call with all data collected so far
      fetch("https://hook.us1.make.com/14hua75v7nvfdt6zzg44ejdye4ke1uij", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          request_id: requestId,
          step1: formData.step1,
          step2: formData.step2,
          step3: formData.step3,
          step4ParentGuide: formData.step4ParentGuide,
          step4Questions: formData.step4Questions
        })
      }).catch(error => console.error("First webhook error:", error));

      // Immediately advance to next step
      setCurrentStep(5);
      return;
    }

    // If moving from step 5 to step 6, advance immediately and call second webhook
    if (currentStep === 5) {
      // Track generate_lead event
      trackGenerateLead({
        parentName: formData.step5ParentName,
        email: formData.step5Email,
        phone: formData.step5Phone,
      });

      setCurrentStep(6);
      setWebhookLoading(true);

      // Second webhook call with ALL form data
      try {
        const response = await fetch("https://hook.us1.make.com/lzemjgu6t8r4ea8zsmuvdot7ltqfdu1q", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            request_id: requestId,
            step1: formData.step1,
            step2: formData.step2,
            step3: formData.step3,
            step4ParentGuide: formData.step4ParentGuide,
            step4Questions: formData.step4Questions,
            step5ParentName: formData.step5ParentName,
            step5Email: formData.step5Email,
            step5Phone: formData.step5Phone
          })
        });
        if (response.ok) {
          const html = await response.text();
          setWebhookHtml(html);
        } else {
          // 400 or other error - leave webhookHtml empty to show fallback
          setWebhookHtml("");
        }
      } catch (error) {
        console.error("Second webhook error:", error);
        setWebhookHtml("");
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
        return formData.step4ParentGuide !== "";
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
      <DialogContent className={`${currentStep === 6 ? 'max-w-full w-[95vw] h-[95vh]' : 'max-w-[800px] h-[90vh] sm:h-[500px]'} p-0 gap-0 bg-background border-0 overflow-hidden`}>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default WizardModal;