import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step6Props {
  parentName: string;
  email: string;
  phone: string;
  onParentNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const formatPhoneNumber = (value: string) => {
  let digits = value.replace(/\D/g, "").slice(0, 10);
  let formatted = digits;
  if (digits.length >= 7) {
    formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length >= 4) {
    formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length >= 1) {
    formatted = `(${digits}`;
  }
  return formatted;
};

const Step6 = ({
  parentName,
  email,
  phone,
  onParentNameChange,
  onEmailChange,
  onPhoneChange,
}: Step6Props) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">
          Your Contact Information
        </h2>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="parentName" className="text-sm font-medium">
          Parent Name
        </Label>
        <Input
          id="parentName"
          value={parentName}
          onChange={(e) => onParentNameChange(e.target.value)}
          placeholder="Jessica Smith"
          className="h-10"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="jessica.smith@example.com"
          className="h-10"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          className="h-10"
          maxLength={14}
          required
        />
        {phone && phone.replace(/\D/g, "").length !== 10 && (
          <p className="text-sm text-destructive">Please enter a valid 10-digit phone number</p>
        )}
      </div>
    </div>
  );
};

export default Step6;
