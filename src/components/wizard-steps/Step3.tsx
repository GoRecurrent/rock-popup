import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Step3Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const Step3 = ({ value, onChange }: Step3Props) => {
  const options = [
    "Transitional Kindergarten",
    "Pre-K",
    "Kindergarten",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade",
  ];

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-6 relative" style={{ zIndex: 10002 }}>
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What grade level(s) are you interested in?
        </h2>
        <p className="text-muted-foreground">Select all that apply.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2 relative" style={{ zIndex: 10003 }}>
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer relative"
            onClick={() => handleToggle(option)}
            style={{ zIndex: 10004 }}
          >
            <Checkbox
              id={option}
              checked={value.includes(option)}
              onCheckedChange={() => handleToggle(option)}
            />
            <Label htmlFor={option} className="flex-1 cursor-pointer font-medium text-foreground text-sm">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3;
