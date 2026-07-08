"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Settings,
  Bell,
  ChevronDown,
  Search,
  LogOut,
  User,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const tabs = [
  { name: "Pesanan", href: "/technician/order", icon: "clipboard" },
  { name: "Laporan", href: "/technician/report", icon: "file" },
  { name: "Pesan", href: "/technician/chat", icon: "message" },
  { name: "Pendapatan", href: "/technician/earnings", icon: "wallet" },
];

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/technician" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <span className="text-lg font-semibold text-foreground">FixIn</span>
          </Link>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari..."
                className="h-9 w-48 lg:w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Settings */}
            <Link
              href="/technician/settings"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                  TE
                </div>
                <span className="text-sm font-medium text-foreground">
                  Teknisi
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfile(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-border bg-popover py-1 shadow-lg">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-medium text-foreground">Teknisi</p>
                      <p className="text-xs text-muted-foreground">teknisi@fixin.id</p>
                    </div>
                    <Link
                      href="/technician/help"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={() => setShowProfile(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Bantuan & Support
                    </Link>
                    <hr className="my-1 border-border" />
                    <button 
                      onClick={() => router.push("/login")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4" />
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Tab Navigation - Desktop */}
        <nav className="hidden md:flex gap-1 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-card">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-500"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="px-4 sm:px-6 py-4 sm:py-6 pb-0">{children}</main>
    </div>
  );
}
