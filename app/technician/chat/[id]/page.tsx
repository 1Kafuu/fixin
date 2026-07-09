"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Phone, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CHAT_DATA: Record<string, { customerName: string; serviceType: string; avatar: string }> = {
  "1": { customerName: "Budi Santoso", serviceType: "Perbaikan Laptop", avatar: "BS" },
  "2": { customerName: "Siti Rahayu", serviceType: "Ganti LCD", avatar: "SR" },
  "3": { customerName: "Ahmad Wijaya", serviceType: "Service Keyboard", avatar: "AW" },
};

interface Message {
  id: string;
  sender: "tech" | "customer";
  content: string;
  time: string;
  isRead: boolean;
}

const MOCK_MESSAGES: Message[] = [
  { id: "1", sender: "customer", content: "Halo, apakah teknisi sudah di jalan?", time: "09:30", isRead: true },
  { id: "2", sender: "tech", content: "Ya, saya sedang dalam perjalanan. Estimasi sampai 30 menit.", time: "09:32", isRead: true },
  { id: "3", sender: "customer", content: "Baik, saya tunggu di rumah ya", time: "09:33", isRead: true },
  { id: "4", sender: "tech", content: "Ok, sampai nanti!", time: "09:35", isRead: true },
];

export default function ChatRoomPage() {
  const params = useParams();
  const [chatData, setChatData] = useState<{ customerName: string; serviceType: string; avatar: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isSessionEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = params.id as string;
    setChatData(MOCK_CHAT_DATA[id] || { customerName: "Pelanggan", serviceType: "-", avatar: "PL" });
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isSessionEnded) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "tech",
      content: inputValue.trim(),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Chat Header Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/technician/chat"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <span className="text-sm font-semibold text-blue-500">{chatData?.avatar}</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">{chatData?.customerName}</h1>
              <p className="text-xs text-muted-foreground">{chatData?.serviceType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Session Ended Banner */}
      {isSessionEnded && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-sm">Sesi konsultasi telah diakhiri oleh pelanggan</p>
          </div>
        </div>
      )}

      {/* Messages Card */}
      <div className="flex-1 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "tech" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5",
                  msg.sender === "tech"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-muted rounded-bl-md"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <div
                  className={cn(
                    "flex items-center gap-1 mt-1",
                    msg.sender === "tech" ? "justify-end" : "justify-start"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px]",
                      msg.sender === "tech" ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </span>
                  {msg.sender === "tech" && msg.isRead && (
                    <span className="text-[10px] text-white/60">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-4">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors mb-3">
            <Phone className="h-4 w-4" />
            Hubungi via Telepon
          </button>

          {/* Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isSessionEnded ? "Sesi telah berakhir" : "Ketik pesan..."}
              disabled={isSessionEnded}
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSessionEnded}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
