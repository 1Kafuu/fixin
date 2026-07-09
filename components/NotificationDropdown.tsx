"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, X, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";

export type NotificationType = "order" | "chat" | "system" | "promo";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon?: "clock" | "alert" | "info" | "check";
}

interface NotificationDropdownProps {
  role: "customer" | "admin" | "technician";
}

const mockNotifications: Record<Notification["type"], Notification[]> = {
  order: [
    {
      id: "1",
      type: "order",
      title: "Pesanan Baru",
      message: "Pesanan #1234 telah diterima dan menunggu konfirmasi",
      time: "5 menit yang lalu",
      isRead: false,
      icon: "clock",
    },
    {
      id: "2",
      type: "order",
      title: "Teknisi Ditemukan",
      message: "Teknisi Budi Santoso telah menerima pesanan Anda",
      time: "15 menit yang lalu",
      isRead: false,
      icon: "check",
    },
    {
      id: "3",
      type: "order",
      title: "Pesanan Selesai",
      message: "Pesanan #1230 telah selesai, silakan lakukan pembayaran",
      time: "1 jam yang lalu",
      isRead: true,
      icon: "check",
    },
  ],
  chat: [
    {
      id: "4",
      type: "chat",
      title: "Pesan Baru",
      message: "Teknisi Andi mengirim pesan regarding pesanan #1234",
      time: "3 menit yang lalu",
      isRead: false,
      icon: "info",
    },
    {
      id: "5",
      type: "chat",
      title: "Balasan Teknisi",
      message: "Pertanyaan Anda telah dibalas oleh teknisi",
      time: "30 menit yang lalu",
      isRead: true,
      icon: "info",
    },
  ],
  system: [
    {
      id: "6",
      type: "system",
      title: "Jadwal Maintenance",
      message: "Sistem akan maintenance pada besok jam 02:00-04:00",
      time: "2 jam yang lalu",
      isRead: true,
      icon: "alert",
    },
  ],
  promo: [
    {
      id: "7",
      type: "promo",
      title: "Diskon 20%",
      message: "Dapatkan diskon 20% untuk perbaikan laptop minggu ini!",
      time: "1 hari yang lalu",
      isRead: true,
      icon: "info",
    },
  ],
};

const getIcon = (icon: Notification["icon"]) => {
  switch (icon) {
    case "clock":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "alert":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "check":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "info":
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

export default function NotificationDropdown({ role }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NotificationType>("order");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = mockNotifications;

  const allNotifications = Object.values(notifications).flat();
  const unreadCount = allNotifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
  };

  const handleMarkAsRead = (id: string) => {
  };

  const tabs: { key: NotificationType; label: string }[] = [
    { key: "order", label: "Pesanan" },
    { key: "chat", label: "Chat" },
    { key: "system", label: "Sistem" },
    { key: "promo", label: "Promo" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-popover shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-blue-500 hover:underline"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications[activeTab].length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Belum ada notifikasi</p>
              </div>
            ) : (
              notifications[activeTab].map((notification) => (
                <div
                  key={notification.id}
                  className={`relative flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-accent/50 ${
                    !notification.isRead ? "bg-accent/30" : ""
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium truncate ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500 mt-1.5" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                    className="flex-shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Check className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-border p-2">
            <button className="w-full rounded-lg px-4 py-2 text-xs font-medium text-blue-500 hover:bg-accent transition-colors">
              Lihat semua notifikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
