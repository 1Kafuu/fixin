// components/customer/DateTimePicker.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Popover as PopoverRoot, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";

export interface DateTimePickerProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  minTime?: string;
  maxTime?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  placeholder?: string;
}

export function DateTimePicker({
  label, error, hint, value, onChange, minDate, maxDate, minTime, maxTime, disabled, required, id, className, placeholder = "Pilih tanggal dan waktu..."
}: DateTimePickerProps) {
  const pickerId = id ?? React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value ?? null);
  const [selectedTime, setSelectedTime] = React.useState<string>("");

  const timeSlots = React.useMemo(() => {
    const slots: string[] = [];
    for (let h = 8; h <= 20; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return slots;
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleDateChange = (daysToAdd: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysToAdd);
    if (minDate && newDate < minDate) newDate.setTime(minDate.getTime());
    if (maxDate && newDate > maxDate) return;
    setSelectedDate(newDate);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours, minutes, 0, 0);
      onChange?.(newDate);
    }
  };

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setSelectedTime(`${value.getHours().toString().padStart(2, "0")}:${value.getMinutes().toString().padStart(2, "0")}`);
    }
  }, [value]);

  const quickDates = [{ label: "Hari Ini", days: 0 }, { label: "Besok", days: 1 }, { label: "Lusa", days: 2 }];

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={pickerId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={pickerId}
            type="button"
            disabled={disabled}
            className={cn("flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm", "focus:outline-none focus:ring-2 focus:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", error && "border-destructive", className)}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className={cn(!selectedDate && "text-muted-foreground")}>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
            </div>
            {selectedTime && <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" /><span>{selectedTime}</span></div>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div className="flex gap-2">
              {quickDates.map((qd) => (
                <Button key={qd.label} variant="outline" size="sm" onClick={() => handleDateChange(qd.days)}>{qd.label}</Button>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Pilih Waktu</p>
              <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
                {timeSlots.map((time) => {
                  if (minTime && time < minTime) return null;
                  if (maxTime && time > maxTime) return null;
                  return (
                    <button key={time} type="button" onClick={() => handleTimeChange(time)}
                      className={cn("px-2 py-1.5 text-sm rounded-md border", "hover:bg-accent", "focus:outline-none focus:ring-2 focus:ring-ring", selectedTime === time && "bg-primary text-primary-foreground border-primary")}>
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end"><Button onClick={() => setIsOpen(false)} size="sm">Selesai</Button></div>
          </div>
        </PopoverContent>
      </PopoverRoot>
      {error && <p className="flex items-center gap-1 text-sm text-destructive"><AlertCircle className="h-3.5 w-3.5" />{error}</p>}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}
