import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface Step5Props {
  parentGuide: string;
  questions: string;
  onParentGuideChange: (value: string) => void;
  onQuestionsChange: (value: string) => void;
}

const Step5 = ({ parentGuide, questions, onParentGuideChange, onQuestionsChange }: Step5Props) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Additional Information
        </h2>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              Would you like to download our comprehensive parent guide?
            </Label>
            <RadioGroup value={parentGuide} onValueChange={onParentGuideChange} className="space-y-3">
              <div
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => onParentGuideChange("yes")}
              >
                <RadioGroupItem value="yes" id="guide-yes" />
                <Label htmlFor="guide-yes" className="flex-1 cursor-pointer font-medium text-foreground">
                  Yes, please send me the parent guide
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => onParentGuideChange("no")}
              >
                <RadioGroupItem value="no" id="guide-no" />
                <Label htmlFor="guide-no" className="flex-1 cursor-pointer font-medium text-foreground">
                  No, thank you
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="questions" className="text-base font-medium mb-3 block">
              Do you have any additional questions? (Optional)
            </Label>
            <Textarea
              id="questions"
              value={questions}
              onChange={(e) => onQuestionsChange(e.target.value)}
              placeholder="Please share any questions or concerns you'd like us to address..."
              className="min-h-[120px] resize-none text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
