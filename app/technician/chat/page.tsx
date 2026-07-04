"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    customerName: "Budi Santoso",
    lastMessage: "Terima kasih, laptop sudah nyala kembali!",
    timestamp: "10:30",
    unreadCount: 2,
    serviceType: "Perbaikan Laptop",
    avatar: "BS",
  },
  {
    id: "2",
    customerName: "Siti Rahayu",
    lastMessage: "Kapan bisa datang?",
    timestamp: "Kemarin",
    unreadCount: 0,
    serviceType: "Ganti LCD",
    avatar: "SR",
  },
  {
    id: "3",
    customerName: "Ahmad Wijaya",
    lastMessage: "Baik, saya tunggu",
    timestamp: "2 hari lalu",
    unreadCount: 0,
    serviceType: "Service Keyboard",
    avatar: "AW",
  },
  {
    id: "4",
    customerName: "Dewi Lestari",
    lastMessage: "Harga its berapa ya?",
    timestamp: "3 hari lalu",
    unreadCount: 1,
    serviceType: "Upgrade RAM",
    avatar: "DL",
  },
];

export default function ChatListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Pesan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Percakapan dengan pelanggan
        </p>
      </div>

      {/* Chat List Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari percakapan..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Conversation Items */}
        <div className="space-y-4">
          {filteredConversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/technician/chat/${conv.id}`}
              className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
            >
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="text-sm font-semibold text-blue-500">
                  {conv.avatar}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground truncate">{conv.customerName}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                    <Clock className="h-3 w-3" />
                    {conv.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  {conv.serviceType}
                </p>
              </div>

              {/* Unread Badge */}
              {conv.unreadCount > 0 && (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-[10px] font-semibold text-white">
                    {conv.unreadCount}
                  </span>
                </div>
              )}
            </Link>
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada percakapan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
