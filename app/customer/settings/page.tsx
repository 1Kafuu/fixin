"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Mail,
  Smartphone,
  Key,
  Save,
  Check,
  Moon,
  Sun,
  Monitor,
  Heart,
  Star,
  Clock,
  ArrowLeft,
  Settings,
  Palette,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const settingsSections = [
  { id: "profile", label: "Profil", icon: User },
  { id: "appearance", label: "Tampilan", icon: Palette },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "preferences", label: "Preferensi", icon: Star },
  { id: "payment", label: "Pembayaran", icon: CreditCard },
  { id: "address", label: "Alamat", icon: MapPin },
  { id: "security", label: "Keamanan", icon: Shield },
];

export default function CustomerSettingsPage() {
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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Settings className="h-5 w-5 text-blue-500" />
            <h1 className="text-lg font-semibold text-foreground">Pengaturan</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-border bg-card p-4">
          <h2 className="mb-4 px-2 text-sm font-medium text-muted-foreground">Menu</h2>
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

        <div className="flex-1 p-4 sm:p-6">
          {activeSection === "profile" && (
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Pengaturan Profil</h3>

              <div className="mb-6 rounded-xl border border-border bg-card p-6">
                <h4 className="mb-4 text-sm font-medium text-foreground">Foto Profil</h4>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white">
                    CU
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
                      defaultValue="Customer FixIn"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Username</label>
                    <input
                      type="text"
                      defaultValue="customer"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                    <input
                      type="email"
                      defaultValue="customer@fixin.id"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">No. Telepon</label>
                    <input
                      type="tel"
                      defaultValue="+62 812 3456 7890"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
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

          {activeSection === "notifications" && (
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Preferensi Notifikasi</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <h4 className="text-sm font-medium text-foreground">Notifikasi Email</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Status pesanan", desc: "Dapatkan update status pesanan via email" },
                      { label: "Promo & Diskon", desc: "Terima informasi promo spesial" },
                      { label: "Teknisi baru", desc: "Notifikasi ketika teknisi baru tersedia" },
                      { label: "Newsletter", desc: "Update berita dan artikel terbaru" },
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
                      { label: "Notifikasi browser", desc: "Tampilkan notifikasi desktop" },
                      { label: "Suara notifikasi", desc: "Putar suara untuk notifikasi baru" },
                      { label: "Chat dari teknisi", desc: "Pemberitahuan pesan baru" },
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

          {activeSection === "preferences" && (
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Preferensi Layanan</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-5 w-5 text-blue-500" />
                    <h4 className="text-sm font-medium text-foreground">Layanan Favorit</h4>
                  </div>
                  <div className="space-y-3">
                    {["Laptop Repair", "Screen Replacement", "Keyboard Replacement", "Data Recovery"].map((service) => (
                      <div key={service} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <span className="text-sm text-foreground">{service}</span>
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
                    <Star className="h-5 w-5 text-blue-500" />
                    <h4 className="text-sm font-medium text-foreground">Filter Teknisi</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">Rating Minimum</label>
                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>4.5+ Bintang</option>
                        <option>4.0+ Bintang</option>
                        <option>3.5+ Bintang</option>
                        <option>Semua</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">Preferensi Teknisi</label>
                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Paling Dekat</option>
                        <option>Rating Tertinggi</option>
                        <option>Harga Terendah</option>
                        <option>Ulasan Terbanyak</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <h4 className="text-sm font-medium text-foreground">Jam Operasional</h4>
                  </div>
                  <div className="space-y-3">
                    {["Senin - Jumat", "Sabtu - Minggu", "Hari Libur"].map((day) => (
                      <div key={day} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <span className="text-sm text-foreground">{day}</span>
                        <div className="flex gap-2">
                          <input type="time" defaultValue="09:00" className="rounded border border-input bg-background px-2 py-1 text-sm" />
                          <span className="self-center text-muted-foreground">-</span>
                          <input type="time" defaultValue="18:00" className="rounded border border-input bg-background px-2 py-1 text-sm" />
                        </div>
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

          {activeSection === "payment" && (
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Metode Pembayaran</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 text-sm font-medium text-foreground">Metode Tersimpan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">VISA</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">**** **** **** 4242</p>
                          <p className="text-xs text-muted-foreground">Berlaku hingga 12/26</p>
                        </div>
                      </div>
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Utama</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">MC</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">**** **** **** 8888</p>
                          <p className="text-xs text-muted-foreground">Berlaku hingga 09/25</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-500 hover:underline">Hapus</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 text-sm font-medium text-foreground">Tambah Metode Baru</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-muted-foreground">Jenis Kartu</label>
                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Kredit</option>
                        <option>Debit</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-muted-foreground">Nomor Kartu</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm text-muted-foreground">Tanggal Kadaluarsa</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-muted-foreground">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                      Tambahkan Kartu
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 text-sm font-medium text-foreground">E-Wallet</h4>
                  <div className="space-y-3">
                    {[
                      { name: "GoPay", checked: true },
                      { name: "OVO", checked: false },
                      { name: "Dana", checked: true },
                    ].map((wallet) => (
                      <div key={wallet.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <span className="text-sm text-foreground">{wallet.name}</span>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked={wallet.checked} className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-background" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "address" && (
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Buku Alamat</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-foreground">Alamat Tersimpan</h4>
                    <button className="text-sm text-blue-500 hover:underline">+ Tambah Alamat</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between rounded-lg border border-border p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">Rumah</p>
                            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Utama</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta Selatan</p>
                          <p className="text-xs text-muted-foreground">12190 - +62 812 3456 7890</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-500 hover:underline">Edit</button>
                        <button className="text-xs text-red-500 hover:underline">Hapus</button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between rounded-lg border border-border p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">Kantor</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">Jl. Gatot Subroto No. 456, Jakarta Pusat</p>
                          <p className="text-xs text-muted-foreground">10220 - +62 812 3456 7890</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-500 hover:underline">Edit</button>
                        <button className="text-xs text-red-500 hover:underline">Hapus</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 text-sm font-medium text-foreground">Tambah Alamat Baru</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-muted-foreground">Label Alamat</label>
                      <input
                        type="text"
                        placeholder="Contoh: Rumah, Kantor"
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-muted-foreground">Alamat Lengkap</label>
                      <textarea
                        rows={3}
                        placeholder="Masukkan alamat lengkap"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm text-muted-foreground">Kota</label>
                        <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>Jakarta Selatan</option>
                          <option>Jakarta Pusat</option>
                          <option>Jakarta Barat</option>
                          <option>Jakarta Timur</option>
                          <option>Jakarta Utara</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-muted-foreground">Kode Pos</label>
                        <input
                          type="text"
                          placeholder="12345"
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-muted-foreground">No. Telepon</label>
                      <input
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                      Simpan Alamat
                    </button>
                  </div>
                </div>
              </div>
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
                    <input type="checkbox" className="peer sr-only" />
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
                      <p className="text-xs text-muted-foreground">Jakarta, Indonesia - Sesi saat ini</p>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Aktif</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Safari di iPhone</p>
                      <p className="text-xs text-muted-foreground">Jakarta, Indonesia - 2 jam yang lalu</p>
                    </div>
                    <button className="text-xs text-red-500 hover:underline">Cabut</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
