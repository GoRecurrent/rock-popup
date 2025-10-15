import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  };

  const currentStudent = value[activeStudentIndex];
  const isCurrentValid = currentStudent?.name !== "" && currentStudent?.gradeLevel !== "";

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">
          What is the name and grade level of your student(s) for 2026-2027 school year?
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
        <div className="space-y-2">
          <Label htmlFor="student-name" className="text-sm font-medium">
            Student's Name
          </Label>
          <Input
            id="student-name"
            value={currentStudent?.name || ""}
            onChange={(e) => handleUpdateChild(activeStudentIndex, "name", e.target.value)}
            placeholder="Enter student's name"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade-level" className="text-sm font-medium">
            Grade Level
          </Label>
          <Select
            value={currentStudent?.gradeLevel || ""}
            onValueChange={(val) => handleUpdateChild(activeStudentIndex, "gradeLevel", val)}
          >
            <SelectTrigger id="grade-level" className="h-10">
              <SelectValue placeholder="Select grade level" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-[300px]">
              {gradeLevels.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
