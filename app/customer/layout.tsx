"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings,
  Bell,
  ChevronDown,
  Search,
  LogOut,
  HelpCircle,
  Menu,
  X,
  User,
} from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";
import { SnackbarProvider } from "@/components/customer";
import { CartProvider } from "@/app/context/CartContext";
import { OrderProvider } from "@/app/context/OrderContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SnackbarProvider>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen bg-background">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 border-b border-border bg-card">
              <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
                {/* Logo */}
                <Link href="/customer/store" className="flex items-center gap-2 sm:gap-3">
                  <Image src="/logo.svg" alt="FixIn Logo" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20" />
                </Link>

                {/* Right side - Desktop */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Cari teknisi, layanan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 w-48 lg:w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Notifications */}
                  <NotificationDropdown role="customer" />

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProfile(!showProfile)}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                        CU
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        Customer
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
                            <p className="text-sm font-medium text-foreground">Customer</p>
                            <p className="text-xs text-muted-foreground">customer@fixin.id</p>
                          </div>
                          <Link
                            href="/customer/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                            onClick={() => setShowProfile(false)}
                          >
                            <User className="h-4 w-4" />
                            Profil
                          </Link>
                          <Link
                            href="/customer/help"
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

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <nav className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Cari teknisi, layanan..."
                      className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <Link
                    href="/customer/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Pengaturan
                  </Link>
                  <button
                    onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                </nav>
              )}
            </header>

            {/* Page Content */}
            <main className="px-4 sm:px-6 py-4 sm:py-6">{children}</main>
          </div>
        </OrderProvider>
      </CartProvider>
    </SnackbarProvider>
  );
}
