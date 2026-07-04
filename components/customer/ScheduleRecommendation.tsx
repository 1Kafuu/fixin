// components/customer/ScheduleRecommendation.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TimeSlot {
  date: Date;
  time: string;
  available: boolean;
}

export interface ScheduleRecommendationProps {
  requestedDate: Date;
  requestedTime: string;
  alternatives: TimeSlot[];
  onSelectAlternative: (slot: TimeSlot) => void;
  onClose: () => void;
  className?: string;
}

export function ScheduleRecommendation({ requestedDate, requestedTime, alternatives, onSelectAlternative, onClose, className }: ScheduleRecommendationProps) {
  const formatDate = (date: Date) => date.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className={cn("space-y-4 p-4 rounded-lg border bg-card", className)}>
      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <p className="text-sm font-medium text-destructive">Jadwal penuh pada jam ini</p>
        <p className="text-xs text-muted-foreground mt-1">{formatDate(requestedDate)} • {requestedTime}</p>
      </div>

      {alternatives.length > 0 ? (
        <>
          <p className="text-sm font-medium">Jadwal alternatif yang tersedia:</p>
          <div className="space-y-2">
            {alternatives.map((slot, index) => (
              <button key={index} type="button" onClick={() => onSelectAlternative(slot)} disabled={!slot.available}
                className={cn("w-full flex items-center gap-3 p-3 rounded-lg border", "hover:bg-accent transition-colors", "focus:outline-none focus:ring-2 focus:ring-ring", "disabled:opacity-50 disabled:cursor-not-allowed", slot.available && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30")}>
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{formatDate(slot.date)}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{slot.time}</p>
                </div>
                {slot.available ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> : <span className="text-xs text-muted-foreground">Penuh</span>}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Tidak ada jadwal alternatif yang tersedia.</p>
      )}

      <div className="flex justify-end"><Button variant="outline" size="sm" onClick={onClose}>Tutup</Button></div>
    </div>
  );
}
