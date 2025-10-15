import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WizardProgress from "./WizardProgress";
import Step1 from "./wizard-steps/Step1";
import Step2 from "./wizard-steps/Step2";

import Step4 from "./wizard-steps/Step4";
import Step5 from "./wizard-steps/Step5";
import Step6 from "./wizard-steps/Step6";
import ThankYouPage from "./wizard-steps/ThankYouPage";
const DISMISSED_KEY = "rockPopupDismissed";

export interface WizardFormData {
  step1: string;
  step2: string;
  step3: { name: string; gradeLevel: string }[];
  step4ParentGuide: string;
  step4Questions: string;
  step5FirstName: string;
  step5LastName: string;
  step5Email: string;
  step5Phone: string;
}

const WizardModal = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({
    step1: "",
    step2: "",
    step3: [{ name: "", gradeLevel: "" }],
    step4ParentGuide: "",
    step4Questions: "",
    step5FirstName: "",
    step5LastName: "",
    step5Email: "",
    step5Phone: "",
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
    setCurrentStep((prev) => Math.min(prev + 1, 6));
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
        return formData.step3.length > 0 && formData.step3.every(child => child.name !== "" && child.gradeLevel !== "");
      case 4:
        return formData.step4ParentGuide !== "";
      case 5:
        return (
          formData.step5FirstName !== "" &&
          formData.step5LastName !== "" &&
          formData.step5Email !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step5Email) &&
          formData.step5Phone.replace(/\D/g, "").length === 10
        );
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 value={formData.step1} onChange={(value) => updateFormData({ step1: value })} onAutoAdvance={handleNext} />;
      case 2:
        return <Step2 value={formData.step2} onChange={(value) => updateFormData({ step2: value })} onAutoAdvance={handleNext} />;
      case 3:
        return <Step4 value={formData.step3} onChange={(value) => updateFormData({ step3: value })} />;
      case 4:
        return (
          <Step5
            parentGuide={formData.step4ParentGuide}
            questions={formData.step4Questions}
            onParentGuideChange={(value) => updateFormData({ step4ParentGuide: value })}
            onQuestionsChange={(value) => updateFormData({ step4Questions: value })}
            onAutoAdvance={handleNext}
          />
        );
      case 5:
        return (
          <Step6
            firstName={formData.step5FirstName}
            lastName={formData.step5LastName}
            email={formData.step5Email}
            phone={formData.step5Phone}
            onFirstNameChange={(value) => updateFormData({ step5FirstName: value })}
            onLastNameChange={(value) => updateFormData({ step5LastName: value })}
            onEmailChange={(value) => updateFormData({ step5Email: value })}
            onPhoneChange={(value) => updateFormData({ step5Phone: value })}
          />
        );
      case 6:
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
      <DialogContent className="max-w-[800px] p-0 gap-0 bg-background border-0 overflow-hidden h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm bg-wizard-sidebar text-white p-1.5 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col sm:flex-row h-full">
          {/* Left Sidebar */}
          <div className="sm:w-[45%] bg-wizard-sidebar p-6 sm:p-8 lg:p-10 flex flex-col text-primary-foreground">
            <img src="/rock-logo.webp" alt="Rock Academy Logo" className="h-12 sm:h-20 w-auto object-contain mb-6 sm:mb-12 self-start" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5 leading-tight text-left">
              Is the Rock Academy the right fit for you?
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 text-left">Get personalized answers in 30 seconds.</p>
          </div>

          {/* Right Content Area */}
          <div className="sm:w-[55%] bg-background flex flex-col">
            {currentStep < 6 && (
              <div className="p-6 pt-16 border-b border-border">
                <WizardProgress currentStep={currentStep} totalSteps={5} />
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 md:p-8">{renderStep()}</div>

            {currentStep < 6 && (
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
                  onClick={currentStep === 5 ? handleNext : handleNext}
                  disabled={!isStepValid()}
                  className="px-8 bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent"
                >
                  {currentStep === 5 ? "Submit" : "Next"}
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
