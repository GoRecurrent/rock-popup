import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Step5Props {
  questions: string;
  onQuestionsChange: (value: string) => void;
  onAutoAdvance?: () => void;
}

const Step5 = ({ questions, onQuestionsChange, onAutoAdvance }: Step5Props) => {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">
          Additional Information
        </h2>

        <div className="space-y-3">
          <div>
            <Label htmlFor="questions" className="text-sm font-medium mb-2 block">
              Do you have any additional questions? (Optional)
            </Label>
            <Textarea
              id="questions"
              value={questions}
              onChange={(e) => onQuestionsChange(e.target.value)}
              placeholder="Please share any questions or concerns you'd like us to address..."
              className="min-h-[80px] resize-none"
            />
          </div>

          <Button
            onClick={onAutoAdvance}
            className="w-full bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
