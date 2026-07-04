// components/customer/ChatRoom.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { useChatRoom } from "@/hooks/useChatRoom";
import type { ChatMessage as ChatMessageType } from "@/hooks/useChatRoom";

export interface ChatRoomProps {
  technicianId: string;
  customerId: string;
  technicianName: string;
  onBack: () => void;
  onTimeout: () => void;
  className?: string;
}

export function ChatRoom({ technicianId, customerId, technicianName, onBack, onTimeout, className }: ChatRoomProps) {
  const [inputText, setInputText] = React.useState("");
  const [showTimeoutWarning, setShowTimeoutWarning] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { messages, isLoading, isConnected, sendMessage, isTechnicianResponding } = useChatRoom({
    technicianId, customerId,
    onTimeout: () => { setShowTimeoutWarning(true); onTimeout(); },
    timeoutMinutes: 3,
  });

  React.useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center gap-3 p-4 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0"><ArrowLeft className="h-5 w-5" /></Button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{technicianName}</p>
          <p className="text-xs text-muted-foreground">{isConnected ? "Tersambung" : "Menghubungkan..."}</p>
        </div>
      </div>

      {showTimeoutWarning && (
        <div className="mx-4 mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200">
          <p className="font-medium">Teknisi sedang tidak responsif</p>
          <p className="text-xs mt-1 opacity-80">Teknisi belum merespons dalam 3 menit</p>
          <Button size="sm" variant="outline" className="mt-2 border-yellow-400 text-yellow-800 hover:bg-yellow-100" onClick={onBack}>Cari Teknisi Lain</Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full"><p className="text-muted-foreground">Memuat percakapan...</p></div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full"><p className="text-muted-foreground">Belum ada pesan.</p></div>
        ) : (
          messages.map((msg: ChatMessageType) => <ChatMessage key={msg.id} message={msg} isOwn={msg.senderType === "customer"} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <input ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ketik pesan..." disabled={!isConnected}
            className={cn("flex-1 h-10 px-4 rounded-full border bg-background", "focus:outline-none focus:ring-2 focus:ring-ring", "disabled:opacity-50 disabled:cursor-not-allowed")} />
          <Button size="icon" onClick={handleSend} disabled={!inputText.trim() || !isConnected} className="flex-shrink-0 rounded-full"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
