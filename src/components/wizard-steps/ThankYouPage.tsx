import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { WizardFormData } from "../WizardModal";

interface ThankYouPageProps {
  formData: WizardFormData;
  onClose: () => void;
}

const ThankYouPage = ({ formData, onClose }: ThankYouPageProps) => {
  const getPersonalizedMessage = () => {
    const messages = [];

    if (formData.step1 === "High quality education") {
      messages.push(
        "We're proud of our rigorous academic standards and our track record of preparing students for college success."
      );
    } else if (formData.step1 === "Faith and character development") {
      messages.push(
        "At Rock Academy, we integrate biblical principles into every aspect of learning, helping students develop strong character and faith."
      );
    } else if (formData.step1 === "Extracurricular activities") {
      messages.push(
        "Our comprehensive extracurricular program offers opportunities in athletics, arts, leadership, and community service."
      );
    } else if (formData.step1 === "Physical and emotional safety") {
      messages.push(
        "We maintain a nurturing environment with dedicated staff, small class sizes, and comprehensive safety protocols."
      );
    }

    if (formData.step2 === "Affordability") {
      messages.push(
        "We offer various financial aid options and tuition assistance programs to make Christian education accessible to families."
      );
    } else if (formData.step2 === "Class size") {
      messages.push(
        "Our average class size is 15 students, ensuring personalized attention and strong teacher-student relationships."
      );
    } else if (formData.step2 === "Academic rigor") {
      messages.push(
        "Our curriculum exceeds state standards, and our graduates consistently score above national averages on standardized tests."
      );
    } else if (formData.step2 === "Fitting in / social environment") {
      messages.push(
        "Our warm, inclusive community welcomes students from diverse backgrounds and helps each child find their place."
      );
    }

    return messages;
  };

  const messages = getPersonalizedMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
      <img src="/logo.png" alt="Rock Academy Logo" className="h-16 mb-6 object-contain" />
      
      <div className="mb-6 flex items-center justify-center">
        <CheckCircle2 className="w-16 h-16 text-success" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Thank you, {formData.step6FirstName}!
      </h1>

      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        We've received your information and are excited to help you learn more about Rock Academy.
      </p>

      <div className="bg-muted rounded-lg p-6 mb-8 max-w-2xl text-left space-y-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Personalized Summary:</h2>
        
        <div className="space-y-3 text-sm text-foreground">
          <div>
            <span className="font-medium">Primary Interest:</span> {formData.step1}
          </div>
          <div>
            <span className="font-medium">Main Concern:</span> {formData.step2}
          </div>
          <div>
            <span className="font-medium">Grade Levels:</span> {formData.step3.join(", ")}
          </div>
          <div>
            <span className="font-medium">Enrollment Year:</span> {formData.step4}
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8 max-w-2xl text-left space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Based on your responses:</h3>
          {messages.map((message, index) => (
            <p key={index} className="text-foreground/90">
              {message}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-4 text-muted-foreground max-w-2xl">
        {formData.step5ParentGuide === "yes" && (
          <p>
            ✓ We'll email you our comprehensive parent guide within the next few minutes.
          </p>
        )}
        <p>
          A member of our admissions team will reach out to you within 1-2 business days to answer any questions
          and schedule a campus tour.
        </p>
      </div>

      <Button onClick={onClose} className="mt-8 px-8 bg-wizard-progress text-primary hover:bg-wizard-progress/90 border-l-4 border-button-accent">
        Close
      </Button>
    </div>
  );
};

export default ThankYouPage;
