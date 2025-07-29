import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";

type PhoneNumberInputProps = React.ComponentProps<typeof Input> & {
  value: string;
  onChange: (value: string) => void;
};

// Helper function to convert Persian/Arabic numbers to English
function toEnglishDigits(str: string): string {
  let result = str;
  // Persian digits
  result = result.replace(/[\u06F0-\u06F9]/g, (d) =>
    String(d.charCodeAt(0) - 0x06f0)
  );
  // Arabic digits
  result = result.replace(/[\u0660-\u0669]/g, (d) =>
    String(d.charCodeAt(0) - 0x0660)
  );
  return result;
}

export const PhoneNumberInput = ({
  onChange,
  className,
  ...props
}: PhoneNumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const englishValue = toEnglishDigits(e.target.value);
    onChange(englishValue);
  };

  return (
    <Input
      type="tel"
      onChange={handleChange}
      inputMode="numeric"
      autoComplete="tel"
      placeholder="شماره موبایل"
      className={cn("text-right", className)}
      {...props}
    />
  );
};
