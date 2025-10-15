import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step4Props {
  value: string;
  onChange: (value: string) => void;
}

const Step4 = ({ value, onChange }: Step4Props) => {
  const options = ["2025-2026", "2026-2027", "2027-2028"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What school year are you considering for enrollment?
        </h2>
        <p className="text-muted-foreground">This helps us prepare the right information for you.</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="school-year" className="text-base font-medium">
          School Year
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="school-year" className="w-full h-12 text-base">
            <SelectValue placeholder="Select a school year" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {options.map((option) => (
              <SelectItem key={option} value={option} className="text-base">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Step4;
