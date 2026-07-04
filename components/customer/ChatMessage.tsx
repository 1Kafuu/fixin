// components/customer/ChatMessage.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Clock } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/hooks/useChatRoom";

export interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
  showTimestamp?: boolean;
  className?: string;
}

const statusIcons = { sending: Clock, sent: Check, delivered: CheckCheck, read: CheckCheck };
const statusColors = { sending: "text-muted-foreground", sent: "text-muted-foreground", delivered: "text-muted-foreground", read: "text-blue-500" };

export function ChatMessage({ message, isOwn, showTimestamp = true, className }: ChatMessageProps) {
  const StatusIcon = statusIcons[message.status];
  const formatTime = (date: Date) => date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start", className)}>
      <div className={cn("max-w-[75%] rounded-2xl px-4 py-2", isOwn ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md")}>
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        {showTimestamp && (
          <div className={cn("flex items-center gap-1 mt-1", isOwn ? "justify-end" : "justify-start")}>
            <span className={cn("text-[10px] opacity-70", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>{formatTime(message.timestamp)}</span>
            {isOwn && <StatusIcon className={cn("h-3 w-3 opacity-70", statusColors[message.status])} />}
          </div>
        )}
      </div>
    </div>
  );
}
