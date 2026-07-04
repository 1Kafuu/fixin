"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

const PRESET_RANGES = [
  { label: "7 Hari", days: 7 },
  { label: "30 Hari", days: 30 },
  { label: "90 Hari", days: 90 },
  { label: "1 Tahun", days: 365 },
];

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handlePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onChange(start, end);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm hover:bg-muted"
      >
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
      </button>

      {showCalendar && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowCalendar(false)} />
          <div className="absolute top-full left-0 z-20 mt-2 rounded-xl border border-border bg-card p-4 shadow-lg min-w-64">
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Preset</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_RANGES.map((preset) => (
                  <button
                    key={preset.days}
                    onClick={() => handlePreset(preset.days)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium mb-2">Navigasi Bulan</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const newDate = new Date(viewDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setViewDate(newDate);
                  }}
                  className="p-1.5 rounded hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">
                  {viewDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={() => {
                    const newDate = new Date(viewDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setViewDate(newDate);
                  }}
                  className="p-1.5 rounded hover:bg-muted"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
