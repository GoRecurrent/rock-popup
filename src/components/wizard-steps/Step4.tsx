import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Child {
  name: string;
  gradeLevel: string;
}

interface Step4Props {
  value: Child[];
  onChange: (value: Child[]) => void;
  onAutoAdvance?: () => void;
}

const Step4 = ({ value, onChange, onAutoAdvance }: Step4Props) => {
  const [activeStudentIndex, setActiveStudentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const gradeLevels = [
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

  const handleAddChild = () => {
    if (value.length < 3) {
      onChange([...value, { name: "", gradeLevel: "" }]);
      setActiveStudentIndex(value.length);
    }
  };

  const handleUpdateChild = (index: number, field: "name" | "gradeLevel", fieldValue: string) => {
    const updated = [...value];
    updated[index][field] = fieldValue;
    onChange(updated);
    if (field === "gradeLevel") {
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const currentStudent = value[activeStudentIndex];
  const isCurrentValid = currentStudent?.name !== "" && currentStudent?.gradeLevel !== "";

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 pt-[15px] sm:pt-0">
          What is the name and grade level of your student(s)?
        </h2>
      </div>

      {/* Student tabs */}
      {value.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {value.map((child, index) => (
            <button
              key={index}
              onClick={() => setActiveStudentIndex(index)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeStudentIndex === index
                  ? "bg-wizard-sidebar text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Student #{index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Current student form */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="student-name" className="text-sm font-medium">
              Student's Full Name
            </Label>
            <Input
              id="student-name"
              value={currentStudent?.name || ""}
              onChange={(e) => handleUpdateChild(activeStudentIndex, "name", e.target.value)}
              placeholder="Enter first & last name"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade-level" className="text-sm font-medium">
              Grade Level (2026-2027)
            </Label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className={currentStudent?.gradeLevel ? "" : "text-muted-foreground"}>
                  {currentStudent?.gradeLevel || "Select grade level"}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg z-[9999]"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  <div className="p-1">
                    {gradeLevels.map((grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => handleUpdateChild(activeStudentIndex, "gradeLevel", grade)}
                        className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add another student button */}
        {value.length < 3 && (
          <Button
            onClick={handleAddChild}
            variant="outline"
            className="w-full mt-2"
            disabled={!isCurrentValid}
          >
            Add another student (up to 3)
          </Button>
        )}

        {/* Next button */}
        <Button
          onClick={onAutoAdvance}
          disabled={!isCurrentValid}
          className="w-full bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
