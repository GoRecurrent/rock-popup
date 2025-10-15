import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Step2Props {
  value: string;
  onChange: (value: string) => void;
}

const Step2 = ({ value, onChange }: Step2Props) => {
  const options = [
    "Affordability",
    "Class size",
    "Academic rigor",
    "Fitting in / social environment",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Which topic concerns you the most?
        </h2>
        <p className="text-muted-foreground">Help us understand your primary area of concern.</p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
            onClick={() => onChange(option)}
          >
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option} className="flex-1 cursor-pointer font-medium text-foreground">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step2;
