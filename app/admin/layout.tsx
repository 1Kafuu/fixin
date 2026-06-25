"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Bell,
  ChevronDown,
  Search,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";

const tabs = [
  { name: "Overview", href: "/admin" },
  { name: "User", href: "/admin/users" },
  { name: "Services", href: "/admin/services" },
  { name: "Technician", href: "/admin/technician" },
  { name: "Content", href: "/admin/content" },
  { name: "Financial", href: "/admin/financial" },
  { name: "Analytics", href: "/admin/analytics" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={36} height={32} />
            <span className="text-lg font-semibold text-foreground">FixIn</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

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
                <span className="hidden text-sm font-medium text-foreground md:block">
                  Admin
                </span>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
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
                      href="/admin/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={() => setShowProfile(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/admin/help"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={() => setShowProfile(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </Link>
                    <hr className="my-1 border-border" />
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-accent">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1 px-6">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
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
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
