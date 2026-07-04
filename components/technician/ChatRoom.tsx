"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Phone, AlertCircle } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { Button } from "@/components/ui/button";

interface ChatRoomProps {
  orderId: string;
  customerName: string;
}

export function ChatRoom({ orderId, customerName }: ChatRoomProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isSessionEnded, sendMessage, isConnected } = useChatWebSocket({
    orderId,
    onMessageReceived: () => {},
    onSessionEnded: () => {},
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSessionEnded) return;

    sendMessage(inputValue.trim());
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full">
      {isSessionEnded && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-sm">Sesi konsultasi telah diakhiri oleh pelanggan</p>
          </div>
        </div>
      )}

      {!isConnected && !isSessionEnded && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">Koneksi terputus. Mencoba menyambung kembali...</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.senderType === "technician"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border px-4 py-2">
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Phone className="h-4 w-4" />
          Hubungi via Telepon
        </Button>
      </div>

      <form onSubmit={handleSend} className="border-t border-border p-4 bg-card">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isSessionEnded ? "Sesi telah berakhir" : "Ketik pesan..."}
            disabled={isSessionEnded}
            className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isSessionEnded}
            className="rounded-full shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
