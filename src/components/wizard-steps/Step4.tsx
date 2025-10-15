import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Child {
  name: string;
  gradeLevel: string;
}

interface Step4Props {
  value: Child[];
  onChange: (value: Child[]) => void;
}

const Step4 = ({ value, onChange }: Step4Props) => {
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
    onChange([...value, { name: "", gradeLevel: "" }]);
  };

  const handleUpdateChild = (index: number, field: "name" | "gradeLevel", fieldValue: string) => {
    const updated = [...value];
    updated[index][field] = fieldValue;
    onChange(updated);
  };

  const handleRemoveChild = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What is the name and grade level of your student(s) for 2026-2027 school year?
        </h2>
        <p className="text-muted-foreground">Add each student you're considering enrolling.</p>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {value.map((child, index) => (
          <div key={index} className="border-l-[3px] border-wizard-sidebar pl-4 space-y-3">
            {value.length > 1 && (
              <div className="flex justify-end">
                <button
                  onClick={() => handleRemoveChild(index)}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`} className="text-sm font-medium">
                Student's Name
              </Label>
              <Input
                id={`name-${index}`}
                value={child.name}
                onChange={(e) => handleUpdateChild(index, "name", e.target.value)}
                placeholder="Enter student's name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`grade-${index}`} className="text-sm font-medium">
                Grade Level
              </Label>
              <Select
                value={child.gradeLevel}
                onValueChange={(val) => handleUpdateChild(index, "gradeLevel", val)}
              >
                <SelectTrigger id={`grade-${index}`} className="h-11">
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
          </div>
        ))}

        {/* Ghost/Add Another Student Button */}
        <button
          onClick={handleAddChild}
          className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add another student</span>
        </button>
      </div>
    </div>
  );
};

export default Step4;
