"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/types/technician";

interface UseChatWebSocketOptions {
  orderId: string;
  onMessageReceived?: (message: ChatMessageType) => void;
  onSessionEnded?: () => void;
}

export function useChatWebSocket({ orderId, onMessageReceived, onSessionEnded }: UseChatWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    setIsConnected(true);
    setMessages([
      {
        id: "1",
        senderId: "customer-1",
        senderType: "customer",
        content: "Halo, apakah teknisi sudah di jalan?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
      },
      {
        id: "2",
        senderId: "tech-1",
        senderType: "technician",
        content: "Ya, saya sedang dalam perjalanan. Estimasi sampai 30 menit.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        isRead: true,
      },
    ]);
  }, [orderId]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (isSessionEnded) return;

    const newMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      senderId: "tech-1",
      senderType: "technician",
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    onMessageReceived?.(newMessage);
  }, [isSessionEnded, onMessageReceived]);

  const endSession = useCallback(() => {
    setIsSessionEnded(true);
    disconnect();
  }, [disconnect]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    messages,
    isSessionEnded,
    sendMessage,
    endSession,
    reconnect: connect,
  };
}
