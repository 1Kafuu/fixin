"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Settings,
  ChevronDown,
  Search,
  LogOut,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";

const tabs = [
  { name: "Overview", href: "/admin" },
  { name: "User", href: "/admin/users" },
  { name: "Services", href: "/admin/services" },
  { name: "Technician", href: "/admin/approval" },
  { name: "Content", href: "/admin/post" },
  { name: "Financial", href: "/admin/financial" },
  { name: "Analytics", href: "/admin/analytics" },
];

export default function AdminLayout({
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
          <Link href="/admin" className="flex items-center gap-2 sm:gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20" />
          </Link>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-48 lg:w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <NotificationDropdown role="admin" />

            {/* Settings */}
            <Link
              href="/admin/settings"
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
                  AD
                </div>
                <span className="text-sm font-medium text-foreground">
                  Admin
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
                      <p className="text-sm font-medium text-foreground">Admin</p>
                      <p className="text-xs text-muted-foreground">admin@fixin.id</p>
                    </div>
                    <Link
                      href="/admin/help"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={() => setShowProfile(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
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
            const isActive =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);

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
          <nav className="md:hidden border-t border-border bg-card overflow-x-auto">
            <div className="min-w-max">
              {tabs.map((tab) => {
                const isActive =
                  tab.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(tab.href);

                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
              <div className="border-t border-border mt-2 pt-2">
                <Link
                  href="/admin/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
