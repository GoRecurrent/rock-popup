import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What grade level(s) are you interested in?
        </h2>
        <p className="text-muted-foreground">Select all that apply.</p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto min-h-[40px] py-2"
          >
            <span className="text-left flex-1">
              {value.length === 0
                ? "Select grade levels..."
                : `${value.length} grade level${value.length !== 1 ? "s" : ""} selected`}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full p-0 bg-background" 
          sideOffset={5}
        >
          <div className="max-h-[320px] overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-2">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleToggle(option)}
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Step3;
