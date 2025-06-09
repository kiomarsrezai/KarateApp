import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { formatDate } from "date-fns-jalali";
import { CalendarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { PersianCalendar } from "~/components/ui/persian-calendar";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (newValue: Date | undefined) => void;
};

export function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal !bg-transparent rounded-full !text-white",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? formatDate(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <PersianCalendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
