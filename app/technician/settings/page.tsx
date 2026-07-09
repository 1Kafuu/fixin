"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Mail,
  Smartphone,
  Key,
  Save,
  Check,
  MapPinIcon,
  Clock,
  Wrench,
  CreditCard,
  Star,
  Moon,
  Sun,
  Monitor,
  Palette,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const settingsSections = [
  { id: "profile", label: "Profil", icon: User },
  { id: "appearance", label: "Tampilan", icon: Palette },
  { id: "services", label: "Layanan", icon: Wrench },
  { id: "schedule", label: "Jadwal", icon: Clock },
  { id: "area", label: "Area Layanan", icon: MapPinIcon },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "earnings", label: "Pendapatan", icon: CreditCard },
  { id: "security", label: "Keamanan", icon: Shield },
];

export default function TechnicianSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-border bg-card p-4">
        <h2 className="mb-4 px-2 text-lg font-semibold text-foreground">Pengaturan</h2>
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
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </aside>

      {/* Mobile Tab Navigation */}
      <div className="flex md:hidden border-b border-border bg-card px-4 overflow-x-auto flex-shrink-0">
        <div className="flex gap-2 py-3">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? "bg-blue-500 text-white"
                  : "bg-muted dark:bg-muted/80 text-muted-foreground hover:bg-blue-100 dark:hover:bg-blue-900/30"
              }`}
            >
              <section.icon className={`h-4 w-4 ${activeSection === section.id ? "" : "text-muted-foreground dark:text-muted-foreground"}`} />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 pt-2">
        {activeSection === "profile" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Pengaturan Profil</h3>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Foto Profil</h4>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white">
                  TE
                </div>
                <div>
                  <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                    Unggah Baru
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG. Maks 2MB</p>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Informasi Pribadi</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Nama Lengkap</label>
                  <input
                    type="text"
                    defaultValue="Teknisi FixIn"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Username</label>
                  <input
                    type="text"
                    defaultValue="teknisi"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="teknisi@fixin.id"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">No. Telepon</label>
                  <input
                    type="tel"
                    defaultValue="+62 898 3567 8195"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Deskripsi Profil</h4>
              <textarea
                rows={4}
                defaultValue="Teknisi laptop profesional dengan pengalaman 5 tahun. Spesialis dalam perbaikan laptop berbagai merek."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">Deskripsi singkat tentang diri Anda.</p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "appearance" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Tampilan</h3>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Tema</h4>
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
          </div>
        )}

        {activeSection === "services" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Layanan</h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Layanan yang Ditawarkan</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Laptop Repair", price: "Rp 150.000", checked: true },
                    { name: "Screen Replacement", price: "Rp 500.000", checked: true },
                    { name: "Keyboard Replacement", price: "Rp 200.000", checked: true },
                    { name: "Data Recovery", price: "Rp 300.000", checked: false },
                    { name: "Virus Removal", price: "Rp 100.000", checked: true },
                    { name: "RAM/SSD Upgrade", price: "Rp 250.000", checked: false },
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <p className="text-xs text-blue-500 font-medium">{service.price}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked={service.checked} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Keahlian & Sertifikasi</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-foreground">ASUS Certified</span>
                    <button className="text-xs text-red-500 hover:underline">Hapus</button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-foreground"> Lenovo Service Partner</span>
                    <button className="text-xs text-red-500 hover:underline">Hapus</button>
                  </div>
                  <button className="w-full rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-blue-500 hover:text-blue-500">
                    + Tambah Sertifikasi
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Waktu Pengerjaan</h4>
                <div className="space-y-3">
                  {["Laptop Repair", "Screen Replacement", "Keyboard Replacement"].map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <span className="w-40 text-sm text-foreground">{service}</span>
                      <input
                        type="text"
                        defaultValue="1-2 hari"
                        className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
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
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "schedule" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Jadwal</h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Jam Operasional</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Senin", active: true },
                    { day: "Selasa", active: true },
                    { day: "Rabu", active: true },
                    { day: "Kamis", active: true },
                    { day: "Jumat", active: true },
                    { day: "Sabtu", active: false },
                    { day: "Minggu", active: false },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span className="text-sm text-foreground">{item.day}</span>
                      <div className="flex items-center gap-3">
                        <input
                          type="time"
                          defaultValue="09:00"
                          disabled={!item.active}
                          className="rounded border border-input bg-background px-2 py-1 text-sm disabled:opacity-50"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                          type="time"
                          defaultValue="18:00"
                          disabled={!item.active}
                          className="rounded border border-input bg-background px-2 py-1 text-sm disabled:opacity-50"
                        />
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked={item.active} className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Batas Pesanan</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Maksimal Pesanan Simultaneous</p>
                      <p className="text-xs text-muted-foreground">Batas pesanan yang bisa ditangani sekaligus</p>
                    </div>
                    <select defaultValue="2" className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Waktu Respond Minimum</p>
                      <p className="text-xs text-muted-foreground">Waktu minimal untuk merespon pesanan</p>
                    </div>
                    <select defaultValue="30 menit" className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
                      <option value="15 menit">15 menit</option>
                      <option value="30 menit">30 menit</option>
                      <option value="1 jam">1 jam</option>
                      <option value="2 jam">2 jam</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Libur</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">17 Agustus 2024</p>
                      <p className="text-xs text-muted-foreground">Hari Kemerdekaan RI</p>
                    </div>
                    <button className="text-xs text-red-500 hover:underline">Hapus</button>
                  </div>
                  <button className="w-full rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-blue-500 hover:text-blue-500">
                    + Tambah Tanggal Libur
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "area" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Area Layanan</h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPinIcon className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Area yang Dilayani</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { area: "Jakarta Selatan", checked: true },
                    { area: "Jakarta Pusat", checked: true },
                    { area: "Jakarta Barat", checked: false },
                    { area: "Jakarta Timur", checked: false },
                    { area: "Jakarta Utara", checked: false },
                    { area: "Tangerang", checked: true },
                    { area: "Depok", checked: false },
                    { area: "Bekasi", checked: false },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span className="text-sm text-foreground">{item.area}</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Radius Maksimal</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    defaultValue="15"
                    className="flex-1"
                  />
                  <span className="w-20 text-center text-sm font-medium text-blue-500">15 km</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Jarak maksimal dari lokasi Anda untuk menerima pesanan</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Biaya Perjalanan</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Dalam radius 5km</span>
                    <span className="text-sm font-medium text-blue-500">Gratis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">5-15 km</span>
                    <input
                      type="text"
                      defaultValue="Rp 15.000"
                      className="w-32 rounded-lg border border-input bg-background px-3 py-1 text-sm text-right focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">15-30 km</span>
                    <input
                      type="text"
                      defaultValue="Rp 25.000"
                      className="w-32 rounded-lg border border-input bg-background px-3 py-1 text-sm text-right focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Preferensi Notifikasi</h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Notifikasi Pesanan</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Pesanan baru", desc: "Notifikasi saat ada pesanan baru", checked: true },
                    { label: "Pesanan dibatalkan", desc: "Notifikasi saat pesanan dibatalkan", checked: true },
                    { label: "Reminder jadwal", desc: "Pengingat sebelum jadwal appointments", checked: true },
                    { label: "Ulasan baru", desc: "Notifikasi saat mendapat ulasan baru", checked: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Notifikasi Email</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Laporan mingguan", desc: "Kirim ringkasan laporan setiap minggu" },
                    { label: "Pemberitahuan pembayaran", desc: "Notifikasi saat pembayaran masuk" },
                    { label: "Update sistem", desc: "Informasi maintenance dan update platform" },
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

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Push Notifications</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Suara notifikasi", desc: "Putar suara untuk notifikasi baru" },
                    { label: "Getaran", desc: "Getar saat ada notifikasi baru" },
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
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "earnings" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Pendapatan</h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <h4 className="text-sm font-medium text-foreground">Metode Pembayaran</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">BCA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">**** **** **** 1234</p>
                        <p className="text-xs text-muted-foreground">a.n. Teknisi FixIn</p>
                      </div>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Utama</span>
                  </div>
                  <button className="w-full rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-blue-500 hover:text-blue-500">
                    + Tambah Rekening Baru
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Minimum Pencairan</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    defaultValue="Rp 100.000"
                    className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-sm text-muted-foreground">Minimum pencairan</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Jadwal Pencairan</h4>
                <div className="space-y-3">
                  {[
                    { label: "Setiap hari", desc: "Cair setiap hari kerja", available: false },
                    { label: "Mingguan", desc: "Cair setiap hari Senin", available: true },
                    { label: "Bulanan", desc: "Cair setiap tanggal 1", available: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="radio" name="schedule" defaultChecked={item.available} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Auto-Pencairan</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Otomatis cairkan saldo saat mencapai minimum</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        )}

        {activeSection === "security" && (
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Keamanan</h3>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-5 w-5 text-blue-500" />
                <h4 className="text-sm font-medium text-foreground">Ubah Password</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Password Saat Ini</label>
                  <input
                    type="password"
                    placeholder="Masukkan password saat ini"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                  Update Password
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Tambah lapisan keamanan tambahan</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Sesi Aktif</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Chrome di Windows</p>
                    <p className="text-xs text-muted-foreground">Jakarta, Indonesia • Sesi saat ini</p>
                  </div>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600">Aktif</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Safari di iPhone</p>
                    <p className="text-xs text-muted-foreground">Jakarta, Indonesia • 2 jam yang lalu</p>
                  </div>
                  <button className="text-xs text-red-500 hover:underline">Cabut</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
