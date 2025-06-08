import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { formatDate } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type DayPickerBase } from "react-day-picker";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (newValue: Date | undefined) => void;
  disabledDate?: DayPickerBase["disabled"];
};

export function DatePicker({ onChange, value, disabledDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? formatDate(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={disabledDate}
        />
      </PopoverContent>
    </Popover>
  );
}
