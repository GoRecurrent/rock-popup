import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { WizardFormData } from "../WizardModal";
interface ThankYouPageProps {
  formData: WizardFormData;
  onClose: () => void;
  webhookHtml: string;
  webhookLoading: boolean;
}
const ThankYouPage = ({
  formData,
  onClose,
  webhookHtml,
  webhookLoading
}: ThankYouPageProps) => {
  const getPersonalizedMessage = () => {
    const messages = [];
    if (formData.step1 === "High quality education") {
      messages.push("We're proud of our rigorous academic standards and our track record of preparing students for college success.");
    } else if (formData.step1 === "Faith and character development") {
      messages.push("At Rock Academy, we integrate biblical principles into every aspect of learning, helping students develop strong character and faith.");
    } else if (formData.step1 === "Extracurricular activities") {
      messages.push("Our comprehensive extracurricular program offers opportunities in athletics, arts, leadership, and community service.");
    } else if (formData.step1 === "Physical and emotional safety") {
      messages.push("We maintain a nurturing environment with dedicated staff, small class sizes, and comprehensive safety protocols.");
    }
    if (formData.step2 === "Affordability") {
      messages.push("We offer various financial aid options and tuition assistance programs to make Christian education accessible to families.");
    } else if (formData.step2 === "Class size") {
      messages.push("Our average class size is 15 students, ensuring personalized attention and strong teacher-student relationships.");
    } else if (formData.step2 === "Academic rigor") {
      messages.push("Our curriculum exceeds state standards, and our graduates consistently score above national averages on standardized tests.");
    } else if (formData.step2 === "Fitting in / social environment") {
      messages.push("Our warm, inclusive community welcomes students from diverse backgrounds and helps each child find their place.");
    }
    return messages;
  };
  const messages = getPersonalizedMessage();
  return <div className="overflow-y-auto h-full px-6 py-8">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        
        
        <div className="mb-6 flex items-center justify-center">
          
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Thank you, {formData.step5ParentName.split(' ')[0]}!
        </h1>

        <p className="text-xl text-muted-foreground mb-8">We're excited to help you learn more about Rock Academy. We'll reach out shortly to answer any questions and schedule a <a href="https://calendly.com/admissions-nlg" target="_blank" rel="noopener noreferrer" className="underline">campus tour</a>.</p>

        {/* Personalized content area */}
        {webhookLoading ? (
          <div className="w-full max-w-[800px] mx-auto mb-8 space-y-4">
            <Skeleton className="h-6 w-3/4 bg-muted/80" />
            <Skeleton className="h-4 w-full bg-muted/80" />
            <Skeleton className="h-4 w-full bg-muted/80" />
            <Skeleton className="h-4 w-5/6 bg-muted/80" />
            <Skeleton className="h-4 w-4/5 bg-muted/80" />
            <Skeleton className="h-4 w-full bg-muted/80" />
            <Skeleton className="h-4 w-3/4 bg-muted/80" />
          </div>
        ) : webhookHtml ? (
          <div 
            className="w-full max-w-[800px] mx-auto mb-8 text-left overflow-y-auto max-h-[60vh] pb-[30px] text-xl text-muted-foreground [&_a]:underline [&_a]:text-primary [&_strong]:text-[#181818] [&_p]:pb-[15px]"
            style={{ fontFamily: 'inherit' }}
            dangerouslySetInnerHTML={{ __html: webhookHtml }}
          />
        ) : messages.length > 0 ? (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8 w-full text-left space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Based on your responses:</h3>
            {messages.map((message, index) => <p key={index} className="text-foreground/90">
                {message}
              </p>)}
          </div>
        ) : null}

        <div className="space-y-4 text-muted-foreground w-full">
          {formData.step4ParentGuide === "yes" && <p>
              ✓ We'll email you our comprehensive parent guide within the next few minutes.
            </p>}
          
        </div>

        <Button onClick={onClose} className="mt-8 px-8 bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent">
          Close
        </Button>
      </div>
    </div>;
};
export default ThankYouPage;