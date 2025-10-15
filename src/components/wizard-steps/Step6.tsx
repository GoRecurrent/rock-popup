import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Step6Props {
  parentName: string;
  email: string;
  phone: string;
  onParentNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAutoAdvance?: () => void;
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
  onAutoAdvance,
}: Step6Props) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneChange(formatted);
  };

  const isValid =
    parentName !== "" &&
    email !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    phone.replace(/\D/g, "").length === 10;

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">
          Your Contact Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
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
        </div>
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

      {phone && phone.replace(/\D/g, "").length !== 10 && phone.length > 0 && (
        <p className="text-sm text-destructive">Please enter a valid 10-digit phone number</p>
      )}

      <Button
        onClick={onAutoAdvance}
        disabled={!isValid}
        className="w-full bg-wizard-sidebar text-white hover:bg-wizard-sidebar/90 border-l-4 border-button-accent"
      >
        Finish
      </Button>
    </div>
  );
};

export default Step6;
