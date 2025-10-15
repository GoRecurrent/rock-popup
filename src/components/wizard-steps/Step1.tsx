import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
  onAutoAdvance?: () => void;
}

const Step1 = ({ value, onChange, onAutoAdvance }: Step1Props) => {
  const options = [
    "High quality education",
    "Faith and character development",
    "Extracurricular activities",
    "Physical and emotional safety",
  ];

  const handleSelect = (option: string) => {
    onChange(option);
    // Auto-advance after a short delay
    setTimeout(() => {
      onAutoAdvance?.();
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Why are you considering Christian schooling for your child?
        </h2>
        <p className="text-muted-foreground">Select the option that best describes your primary motivation.</p>
      </div>

      <RadioGroup value={value} onValueChange={handleSelect} className="space-y-3">
        {options.map((option, index) => (
          <div
            key={option}
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              value === "" ? "border-border animate-[shimmer_2s_ease-in-out_infinite]" : "border-border hover:border-primary"
            }`}
            style={value === "" ? { animationDelay: `${index * 0.2}s` } : {}}
            onClick={() => handleSelect(option)}
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

export default Step1;
