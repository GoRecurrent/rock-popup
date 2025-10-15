import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WizardProgress from "./WizardProgress";
import Step1 from "./wizard-steps/Step1";
import Step2 from "./wizard-steps/Step2";
import Step3 from "./wizard-steps/Step3";
import Step4 from "./wizard-steps/Step4";
import Step5 from "./wizard-steps/Step5";
import Step6 from "./wizard-steps/Step6";
import ThankYouPage from "./wizard-steps/ThankYouPage";
const DISMISSED_KEY = "rockPopupDismissed";

export interface WizardFormData {
  step1: string;
  step2: string;
  step3: string[];
  step4: string;
  step5ParentGuide: string;
  step5Questions: string;
  step6FirstName: string;
  step6LastName: string;
  step6Email: string;
  step6Phone: string;
}

const WizardModal = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({
    step1: "",
    step2: "",
    step3: [],
    step4: "2026-2027",
    step5ParentGuide: "yes",
    step5Questions: "",
    step6FirstName: "",
    step6LastName: "",
    step6Email: "",
    step6Phone: "",
  });

  useEffect(() => {
    const flag = localStorage.getItem(DISMISSED_KEY);
    if (flag === "1") {
      setDismissed(true);
    } else {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.step1 !== "";
      case 2:
        return formData.step2 !== "";
      case 3:
        return formData.step3.length > 0;
      case 4:
        return formData.step4 !== "";
      case 5:
        return formData.step5ParentGuide !== "";
      case 6:
        return (
          formData.step6FirstName !== "" &&
          formData.step6LastName !== "" &&
          formData.step6Email !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step6Email) &&
          formData.step6Phone.replace(/\D/g, "").length === 10
        );
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 value={formData.step1} onChange={(value) => updateFormData({ step1: value })} />;
      case 2:
        return <Step2 value={formData.step2} onChange={(value) => updateFormData({ step2: value })} />;
      case 3:
        return <Step3 value={formData.step3} onChange={(value) => updateFormData({ step3: value })} />;
      case 4:
        return <Step4 value={formData.step4} onChange={(value) => updateFormData({ step4: value })} />;
      case 5:
        return (
          <Step5
            parentGuide={formData.step5ParentGuide}
            questions={formData.step5Questions}
            onParentGuideChange={(value) => updateFormData({ step5ParentGuide: value })}
            onQuestionsChange={(value) => updateFormData({ step5Questions: value })}
          />
        );
      case 6:
        return (
          <Step6
            firstName={formData.step6FirstName}
            lastName={formData.step6LastName}
            email={formData.step6Email}
            phone={formData.step6Phone}
            onFirstNameChange={(value) => updateFormData({ step6FirstName: value })}
            onLastNameChange={(value) => updateFormData({ step6LastName: value })}
            onEmailChange={(value) => updateFormData({ step6Email: value })}
            onPhoneChange={(value) => updateFormData({ step6Phone: value })}
          />
        );
      case 7:
        return <ThankYouPage formData={formData} onClose={handleClose} />;
      default:
        return null;
    }
  };

  if (dismissed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-6xl p-0 gap-0 bg-background border-0 overflow-hidden h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-5 w-5 text-primary-foreground" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Sidebar */}
          <div className="md:w-1/3 bg-wizard-sidebar p-8 md:p-12 flex flex-col text-primary-foreground">
            <img src="/rock-logo.webp" alt="Rock Academy Logo" className="h-16 w-auto object-contain mb-12 self-start" />
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight text-left">
              Is the Rock Academy the right fit for you?
            </h1>
            <p className="text-base opacity-90 text-left">Get personalized answers in 30 seconds.</p>
          </div>

          {/* Right Content Area */}
          <div className="md:w-2/3 bg-background flex flex-col">
            {currentStep < 7 && (
              <div className="p-6 border-b border-border">
                <WizardProgress currentStep={currentStep} totalSteps={6} />
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 md:p-8">{renderStep()}</div>

            {currentStep < 7 && (
              <div className="p-6 border-t border-border flex justify-between gap-4">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="px-8 hover:bg-wizard-progress hover:text-primary hover:border-wizard-progress"
                >
                  Back
                </Button>
                <Button
                  onClick={currentStep === 6 ? handleNext : handleNext}
                  disabled={!isStepValid()}
                  className="px-8 bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent"
                >
                  {currentStep === 6 ? "Submit" : "Next"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WizardModal;
