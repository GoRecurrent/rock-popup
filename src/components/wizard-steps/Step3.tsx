import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Step3Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const Step3 = ({ value, onChange }: Step3Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What grade level(s) are you interested in?
        </h2>
        <p className="text-muted-foreground">Select all that apply.</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between h-auto min-h-[40px] py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-left flex-1">
            {value.length === 0
              ? "Select grade levels..."
              : `${value.length} grade level${value.length !== 1 ? "s" : ""} selected`}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
        </Button>

        {isOpen && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg z-[9999]"
            style={{ maxHeight: "320px", overflowY: "auto" }}
          >
            <div className="p-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
