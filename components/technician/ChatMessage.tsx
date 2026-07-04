"use client";

import { ChatMessage as ChatMessageType } from "@/types/technician";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cn("flex mb-3", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5",
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isOwn ? "justify-end" : "justify-start"
          )}
        >
          <span
            className={cn(
              "text-[10px]",
              isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
            )}
          >
            {formatTime(message.timestamp)}
          </span>
          {isOwn && message.isRead && (
            <span className="text-[10px] text-primary-foreground/60">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
