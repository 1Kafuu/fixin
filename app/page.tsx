import { Play, MessageCircle, Phone, Mail, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosAppstore } from "react-icons/io";
import { FaGooglePlay, FaFacebook, FaInstagram } from "react-icons/fa";



export const metadata: Metadata = {
  title: "FixIn — Geek Talk. Pro Fix. All In One App",
  description: "Laptop sehat, dompet selamat. Teknisi diverifikasi, solusi dijamin.",
};

function Logo() {
  return (
    <div className="flex  gap-2">
      <Image src="/logo.svg" alt="FixIn Logo" width={40} height={36} className="h-20 w-25" />
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Logo />
      <nav className="hidden items-center gap-8 text-sm text-foreground md:flex">
        <a href="#about" className="hover:text-blue-500">About</a>
        <a href="#how" className="hover:text-blue-500">How To Use</a>
        <a href="#service" className="hover:text-blue-500">Service</a>
        <a href="#contact" className="hover:text-blue-500">Contact</a>
      </nav>
      <Link href="/login">
        <button className="rounded-lg border-2 border-blue-500 px-6 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
          Login
        </button>
      </Link>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-16 md:py-20 bg-gray-100 h-150 w-full flex items-center justify-center"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0.85 0.01 250) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <Image src="/icon.svg" alt="FixIn Logo" width={40} height={36} className="h-18 w-18"/>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Geek Talk. Pro Fix
          </h1>
          <p className="mt-2 text-3xl font-medium text-gray-400 text-muted-foreground md:text-4xl">
            All In One App
          </p>
          <p className="mt-4 text-sm text-foreground">Laptop sehat, dompet selamat</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-4 font-semibold  text-xl text-white hover:opacity-90">
              <Play />
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="about"className="relative mx-auto max-w-5xl px-6 py-20 text-center">
      <Sparkle className="absolute right-8 top-16 h-6 w-6 text-blue-500" />
      <Sparkle className="absolute left-8 bottom-8 h-5 w-5 text-blue-500" />
      <h2 className="text-3xl font-bold text-foreground md:text-4xl">
        Teknisi Diverifikasi, Solusi Dijamin
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
        Komunitas ribuan pengguna laptop aktif + teknisi berpengalaman yang sudah diverifikasi KTP & sertifikat.
        Tanya gratis ke sesama user, atau panggil teknisi rating 4.8+ yang datang ke tempatmu — semua transparan,
        harga di depan, garansi pengerjaan.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { n: "10.000+", l: "Masalah Teratasi" },
          { n: "9 dari 10", l: "Merasa Puas" },
          { n: "1.500+", l: "Teknisi Ahli" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-[oklch(0.85_0.05_245)] bg-white px-6 py-8">
            <div className="text-3xl font-bold text-foreground">{s.n}</div>
            <div className="mt-2 text-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowToUse() {
  const steps = [
    "Pilih Jenis Service (Home Service/Online Consultion)",
    "Deskripsikan Masalah Laptopmu, Dan Konfirmasi Booking",
    "Teknisi Profesional akan menyelesaikan masalahmu",
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">How To Use FixIn</h2>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-[oklch(0.55_0.01_250)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/30">
            <Play className="h-10 w-10 fill-white text-white" />
          </div>
        </div>
        <div className="space-y-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                {i + 1}
              </div>
              <p className="pt-1 text-foreground">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const cats = [
    {
      title: "Software Repair",
      sub: "Perbaikan masalah software & sistem operasi laptop Anda",
      items: [
        "Virus/malware removal & pembersihan total",
        "Install ulang Windows/macOS + drivers",
        "Perbaikan error blue screen, crash, freeze",
        "Optimasi kecepatan & performa laptop lambat",
        "Recovery data yang terhapus atau corrupt",
        "Troubleshooting software error & konflik program",
      ],
    },
    {
      title: "Hardware Repair",
      sub: "Perbaikan & penggantian komponen fisik laptop",
      items: [
        "Ganti layar/LCD yang pecah atau bergaris",
        "Perbaikan keyboard/touchpad yang error",
        "Ganti baterai boros atau sudah bengkak",
        "Perbaikan port charging/USB yang rusak",
        "Cleaning system & thermal paste untuk laptop overheating",
        "Board level repair untuk masalah motherboard",
        "Upgrade RAM & SSD untuk performa lebih kencang",
      ],
    },
    {
      title: "Emergency Service",
      sub: "Servis darurat 2 jam — untuk keadaan kritis!",
      items: [
        "Laptop tidak bisa nyala sama sekali (dead)",
        "Blue screen terus menerus",
        "Butuh laptop untuk meeting/presentasi penting",
        "Deadline pekerjaan yang ketat",
        "Data penting butuh di-recover segera",
        "Masalah lain yang menghentikan aktivitas",
      ],
    },
    {
      title: "Preverentive Maintenance",
      sub: "Perawatan rutin untuk mencegah kerusakan & memperpanjang usia laptop",
      items: [
        "Full cleaning service — bersihkan debu dalam laptop",
        "Thermal paste renewal — agar tidak overheating",
        "Battery health check — cek kondisi baterai",
        "Diagnosa komprehensif — deteksi masalah sejak dini",
        "Software optimization — update & tune up sistem",
        "Data backup assistance — bantu backup data penting",
        "Preventive parts replacement — ganti komponen sebelum rusak",
      ],
    },
  ];

  return (
    <section id="service" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">Service Categories</h2>
      <p className="mt-3 text-center text-sm text-foreground">
        Kami menyediakan berbagai service untuk mengatasi kendala laptopmu
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <div key={c.title} className="rounded-2xl border border-[oklch(0.92_0.01_250)] bg-white p-6 shadow-sm">
            <h3 className="text-center text-lg font-bold text-foreground">{c.title}</h3>
            <p className="mt-3 text-center text-xs italic text-muted-foreground">"{c.sub}"</p>
            <ul className="mt-5 space-y-3">
              {c.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-xs text-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-500" strokeWidth={3} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h4 className="font-bold text-foreground">Suarakan Keluhanmu!</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Lapor Bug</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Terms of Service</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Return Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Metode Pembayaran</h4>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground">
            <div className="rounded border px-2 py-1 text-center">BCA</div>
            <div className="rounded border px-2 py-1 text-center">MANDIRI</div>
            <div className="rounded border px-2 py-1 text-center">BNI</div>
            <div className="rounded border px-2 py-1 text-center">GOPAY</div>
            <div className="rounded border px-2 py-1 text-center">OVO</div>
            <div className="rounded border px-2 py-1 text-center">DANA</div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Interact with FixIn</h4>
          <div className="mt-4 flex gap-3">
            {[FaFacebook, FaInstagram,MessageCircle, Phone].map((Icon, i) => (
              <div key={i} className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 text-white">
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-500" /> 0898 3567 8195</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-500" /><span>cs.support@fix.in</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Stats />
      <HowToUse />
      <Services />
      <Footer />
    </div>
  );
}
