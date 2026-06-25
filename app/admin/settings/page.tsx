"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Smartphone,
  Key,
  Save,
  Check,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "general", label: "General", icon: Globe },
  { id: "database", label: "Database", icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle theme change
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card p-4">
        <h2 className="mb-4 px-2 text-lg font-semibold text-foreground">Settings</h2>
        <nav className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-accent text-blue-500 dark:bg-blue-500/20"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeSection === "profile" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Profile Settings</h3>

            {/* Avatar */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Profile Picture</h4>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white">
                  AD
                </div>
                <div>
                  <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                    Upload New
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG. Max 2MB</p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Personal Information</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin FixIn"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Username</label>
                  <input
                    type="text"
                    defaultValue="admin"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@fixin.id"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+62 898 3567 8195"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Bio</h4>
              <textarea
                rows={4}
                defaultValue="Administrator for FixIn laptop repair service platform."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">Brief description for your profile.</p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Notification Preferences</h3>

            <div className="mb-6 space-y-4">
              {/* Email Notifications */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "New user registrations", desc: "Get notified when new users sign up" },
                    { label: "Booking confirmations", desc: "Receive alerts for new bookings" },
                    { label: "Payment received", desc: "Email when payments are processed" },
                    { label: "System alerts", desc: "Critical system notifications" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Push Notifications</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Browser notifications", desc: "Show desktop notifications" },
                    { label: "Sound alerts", desc: "Play sound for new notifications" },
                    { label: "Daily summary", desc: "Receive daily activity summary" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        )}

        {activeSection === "security" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Security Settings</h3>

            {/* Change Password */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-5 w-5 text-blue-500" />
                <h4 className="text-sm font-medium text-foreground">Change Password</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                  Update Password
                </button>
              </div>
            </div>

            {/* Two Factor */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                </label>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Chrome on Windows</p>
                    <p className="text-xs text-muted-foreground">Jakarta, Indonesia • Current session</p>
                  </div>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600">Active</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Safari on iPhone</p>
                    <p className="text-xs text-muted-foreground">Jakarta, Indonesia • 2 hours ago</p>
                  </div>
                  <button className="text-xs text-red-500 hover:underline">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "appearance" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Appearance Settings</h3>

            {/* Theme */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Theme</h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    theme === "light"
                      ? "border-blue-500 bg-card"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <Sun className={`h-6 w-6 ${theme === "light" ? "text-blue-500" : "text-foreground"}`} />
                  <span className={`text-xs font-medium ${theme === "light" ? "text-blue-500" : "text-muted-foreground"}`}>
                    Light
                  </span>
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    theme === "dark"
                      ? "border-blue-500 bg-card"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <Moon className={`h-6 w-6 ${theme === "dark" ? "text-blue-500" : "text-foreground"}`} />
                  <span className={`text-xs font-medium ${theme === "dark" ? "text-blue-500" : "text-muted-foreground"}`}>
                    Dark
                  </span>
                </button>
                <button
                  onClick={() => handleThemeChange("system")}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    theme === "system"
                      ? "border-blue-500 bg-card"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <Monitor className={`h-6 w-6 ${theme === "system" ? "text-blue-500" : "text-foreground"}`} />
                  <span className={`text-xs font-medium ${theme === "system" ? "text-blue-500" : "text-muted-foreground"}`}>
                    System
                  </span>
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Accent Color</h4>
              <div className="flex gap-3">
                {[
                  { color: "bg-blue-500", name: "Blue" },
                  { color: "bg-emerald-500", name: "Emerald" },
                  { color: "bg-violet-500", name: "Violet" },
                  { color: "bg-rose-500", name: "Rose" },
                  { color: "bg-amber-500", name: "Amber" },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`h-10 w-10 rounded-full ${item.color} hover:scale-110 transition-transform`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "general" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">General Settings</h3>

            <div className="mb-6 space-y-4">
              {/* Language */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Language & Region</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Language</label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>English</option>
                      <option>Bahasa Indonesia</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Timezone</label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>Asia/Jakarta (GMT+7)</option>
                      <option>Asia/Makassar (GMT+8)</option>
                      <option>Asia/Jayapura (GMT+9)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Date Format</label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Currency</label>
                    <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>IDR (Rupiah)</option>
                      <option>USD (Dollar)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Company Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Company Name</label>
                    <input
                      type="text"
                      defaultValue="FixIn"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Support Email</label>
                    <input
                      type="email"
                      defaultValue="cs.support@fix.in"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Contact Number</label>
                    <input
                      type="tel"
                      defaultValue="0898 3567 8195"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        )}

        {activeSection === "database" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Database Settings</h3>

            {/* Backup */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Backup & Restore</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Latest Backup</p>
                    <p className="text-xs text-muted-foreground">June 15, 2024 at 02:30 AM</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                      Download
                    </button>
                    <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
                      Backup Now
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Restore from Backup</label>
                  <input type="file" className="w-full text-sm" />
                  <p className="mt-1 text-xs text-muted-foreground">Upload a .sql or .json backup file</p>
                </div>
              </div>
            </div>

            {/* Cache */}
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Cache Management</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Clear Application Cache</p>
                  <p className="text-xs text-muted-foreground">Remove temporary files and cached data</p>
                </div>
                <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
                  Clear Cache
                </button>
              </div>
            </div>

            {/* Maintenance */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Maintenance Mode</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable Maintenance Mode</p>
                  <p className="text-xs text-muted-foreground">Temporarily disable the site for visitors</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
