// hooks/useChatRoom.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderType: "customer" | "technician";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
}

interface UseChatRoomOptions {
  technicianId: string;
  customerId: string;
  onTimeout?: () => void;
  timeoutMinutes?: number;
}

interface UseChatRoomReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  sendMessage: (text: string) => void;
  isTechnicianResponding: boolean;
}

export function useChatRoom({
  customerId,
  onTimeout,
  timeoutMinutes = 3,
}: UseChatRoomOptions): UseChatRoomReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isTechnicianResponding, setIsTechnicianResponding] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTechnicianResponding(false);
    timeoutRef.current = setTimeout(() => {
      setIsTechnicianResponding(true);
      onTimeout?.();
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes, onTimeout]);

  const sendMessage = useCallback((text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      senderId: customerId,
      senderType: "customer",
      timestamp: new Date(),
      status: "sending",
    };
    setMessages((prev) => [...prev, newMessage]);
    resetTimeout();
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => msg.id === newMessage.id ? { ...msg, status: "sent" } : msg));
    }, 500);
  }, [customerId, resetTimeout]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setMessages([{
        id: "1",
        text: "Halo, ada yang bisa saya bantu?",
        senderId: "tech-001",
        senderType: "technician",
        timestamp: new Date(Date.now() - 60000),
        status: "read",
      }]);
      setIsLoading(false);
      setIsConnected(true);
      resetTimeout();
    }, 1000);
    return () => clearTimeout(timer);
  }, [resetTimeout]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return { messages, isLoading, isConnected, sendMessage, isTechnicianResponding };
}
