import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Step2Props {
  value: string;
  onChange: (value: string) => void;
  onAutoAdvance?: () => void;
}

const Step2 = ({ value, onChange, onAutoAdvance }: Step2Props) => {
  const options = [
    "Affordability",
    "Class size",
    "Academic rigor",
    "Fitting in / social environment",
  ];

  const handleSelect = (option: string) => {
    onChange(option);
    // Auto-advance after a short delay
    setTimeout(() => {
      onAutoAdvance?.();
    }, 300);
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 pt-[15px] sm:pt-0">
          Which topic concerns you the most?
        </h2>
      </div>

      <RadioGroup value={value} onValueChange={handleSelect} className="space-y-3">
        {options.map((option, index) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              value === "" ? "border-border animate-[shimmer_2s_ease-in-out_infinite]" : "border-border hover:border-primary"
            }`}
            style={value === "" ? { animationDelay: `${index * 0.2}s` } : {}}
          >
            <RadioGroupItem value={option} id={option} className="pointer-events-none" />
            <Label htmlFor={option} className="flex-1 cursor-pointer font-medium text-foreground pointer-events-none">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step2;
