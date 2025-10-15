import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step6Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
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
  firstName,
  lastName,
  email,
  phone,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
}: Step6Props) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Contact Information
        </h2>
        <p className="text-muted-foreground">We'll use this information to send you personalized recommendations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-base font-medium">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="John"
            className="h-12 text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-base font-medium">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Smith"
            className="h-12 text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="john.smith@example.com"
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium">
          Phone Number *
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          className="h-12 text-base"
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
