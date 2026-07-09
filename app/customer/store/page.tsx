"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  MessageCircle,
  Star,
  X,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  Send,
  UserPlus,
  AlertTriangle,
  Package,
  Settings,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, TechnicianBooking } from "@/app/context/CartContext";
import NotificationDropdown from "@/components/NotificationDropdown";

const technicians = [
  {
    id: "tech-001",
    name: "Ahmad Wijaya",
    photo: "https://i.pravatar.cc/150?img=11",
    specialty: "Laptop & Komputer",
    rating: 4.8,
    reviewCount: 124,
    status: "online" as const,
    location: "Jakarta Selatan",
    distance: 2.3,
    isVerified: true,
    bio: "Teknisi berpengalaman lebih dari 5 tahun dalam perbaikan laptop dan komputer. Spesialisasi dalam perbaikan hardware dan software.",
    yearsExperience: 5,
    completedJobs: 340,
    responseTime: "~5 menit",
    priceRange: "Rp 50.000 - 500.000",
    skills: ["Screen Replacement", "Keyboard Repair", "Virus Removal", "Windows Install"],
  },
  {
    id: "tech-002",
    name: "Budi Santoso",
    photo: "https://i.pravatar.cc/150?img=12",
    specialty: "Smartphone & Tablet",
    rating: 4.5,
    reviewCount: 89,
    status: "busy" as const,
    location: "Jakarta Pusat",
    distance: 5.1,
    isVerified: true,
    bio: "Spesialis perbaikan laptop dan komputer dengan pengalaman 4 tahun. Melayani berbagai merek seperti ASUS, Acer, Lenovo, dan Dell.",
    yearsExperience: 4,
    completedJobs: 245,
    responseTime: "~10 menit",
    priceRange: "Rp 25.000 - 350.000",
    skills: ["Screen Replacement", "Battery Change", "Keyboard Fix", "Software Issue"],
  },
  {
    id: "tech-003",
    name: "Dewi Lestari",
    photo: "https://i.pravatar.cc/150?img=5",
    specialty: "Elektronik Rumah Tangga",
    rating: 4.9,
    reviewCount: 201,
    status: "online" as const,
    location: "Tangerang",
    distance: 12.4,
    isVerified: true,
    bio: "Ahli elektronik rumah tangga dengan pengalaman 6 tahun. Bisa memperbaiki TV, kulkas, mesin cuci, dan AC.",
    yearsExperience: 6,
    completedJobs: 412,
    responseTime: "~8 menit",
    priceRange: "Rp 75.000 - 750.000",
    skills: ["TV Repair", "Kulkas Service", "Mesin Cuci", "AC Installation"],
  },
  {
    id: "tech-004",
    name: "Eko Prasetyo",
    photo: "https://i.pravatar.cc/150?img=13",
    specialty: "Laptop & Komputer",
    rating: 4.2,
    reviewCount: 56,
    status: "offline" as const,
    location: "Depok",
    distance: 18.2,
    isVerified: false,
    bio: "Teknisi laptop freelance dengan pengalaman 3 tahun. Melayani install ulang dan perbaikan minor.",
    yearsExperience: 3,
    completedJobs: 89,
    responseTime: "~15 menit",
    priceRange: "Rp 50.000 - 300.000",
    skills: ["Windows Install", "Software Repair", "Driver Update"],
  },
  {
    id: "tech-005",
    name: "Fitri Handayani",
    photo: "https://i.pravatar.cc/150?img=9",
    specialty: "Smartphone & Tablet",
    rating: 4.7,
    reviewCount: 178,
    status: "online" as const,
    location: "Bandung",
    distance: 8.5,
    isVerified: true,
    bio: "Teknisi laptop profesional bersertifikat dengan fokus pada perbaikan MacBook dan laptop branded. Certified Apple Service.",
    yearsExperience: 5,
    completedJobs: 523,
    responseTime: "~5 menit",
    priceRange: "Rp 100.000 - 1.500.000",
    skills: ["MacBook Repair", "Laptop Service", "Data Recovery", "Screen Fix"],
  },
  {
    id: "tech-006",
    name: "Gunawan Adi",
    photo: "https://i.pravatar.cc/150?img=14",
    specialty: "Laptop & Komputer",
    rating: 4.6,
    reviewCount: 95,
    status: "busy" as const,
    location: "Jakarta Barat",
    distance: 6.2,
    isVerified: true,
    bio: "Spesialis motherboard dan chip-level repair. Mampu menangani kerusakan kompleks pada laptop.",
    yearsExperience: 7,
    completedJobs: 678,
    responseTime: "~12 menit",
    priceRange: "Rp 150.000 - 2.000.000",
    skills: ["Motherboard Repair", "Chip Replacement", "BGA Repair", "Soldering"],
  },
  {
    id: "tech-007",
    name: "Hesti Rahayu",
    photo: "https://i.pravatar.cc/150?img=10",
    specialty: "Elektronik Rumah Tangga",
    rating: 4.3,
    reviewCount: 67,
    status: "offline" as const,
    location: "Bekasi",
    distance: 15.7,
    isVerified: false,
    bio: "Teknisi elektronik rumahan yang ahli dalam perbaikan mesin cuci dan AC.",
    yearsExperience: 4,
    completedJobs: 156,
    responseTime: "~20 menit",
    priceRange: "Rp 50.000 - 500.000",
    skills: ["Mesin Cuci", "AC Service", "Kulkas"],
  },
  {
    id: "tech-008",
    name: "Irfan Hakim",
    photo: "https://i.pravatar.cc/150?img=15",
    specialty: "Laptop & Komputer",
    rating: 4.9,
    reviewCount: 312,
    status: "online" as const,
    location: "Jakarta Timur",
    distance: 4.1,
    isVerified: true,
    bio: "Master technician dengan 8 tahun pengalaman. Fokus pada MacBook dan high-end laptops.",
    yearsExperience: 8,
    completedJobs: 892,
    responseTime: "~3 menit",
    priceRange: "Rp 200.000 - 3.000.000",
    skills: ["MacBook Repair", "Data Recovery", "SSD Upgrade", "Screen Replacement"],
  },
  {
    id: "tech-009",
    name: "Jasmine Putri",
    photo: "https://i.pravatar.cc/150?img=20",
    specialty: "Smartphone & Tablet",
    rating: 4.4,
    reviewCount: 143,
    status: "online" as const,
    location: "Surabaya",
    distance: 22.3,
    isVerified: true,
    bio: "Spesialis laptop dan komputer dengan pengalaman 4 tahun. Melayani berbagai merek seperti ASUS, HP, dan Lenovo.",
    yearsExperience: 4,
    completedJobs: 334,
    responseTime: "~7 menit",
    priceRange: "Rp 50.000 - 800.000",
    skills: ["Laptop Repair", "Hardware Fix", "Screen Replacement", "Battery Change"],
  },
  {
    id: "tech-010",
    name: "Kurniawan Adi",
    photo: "https://i.pravatar.cc/150?img=16",
    specialty: "Elektronik Rumah Tangga",
    rating: 4.1,
    reviewCount: 42,
    status: "busy" as const,
    location: "Yogyakarta",
    distance: 18.9,
    isVerified: false,
    bio: "Teknisi elektronik dengan spesialisasi TV LED dan Smart TV.",
    yearsExperience: 3,
    completedJobs: 78,
    responseTime: "~15 menit",
    priceRange: "Rp 75.000 - 600.000",
    skills: ["TV LED", "Smart TV", "Remote Control"],
  },
];

type Technician = (typeof technicians)[0];

const specialties = [
  { value: "all", label: "Semua" },
  { value: "Laptop & Komputer", label: "Laptop" },
  { value: "Smartphone & Tablet", label: "Smartphone" },
  { value: "Elektronik Rumah Tangga", label: "Elektronik" },
];

function TechnicianCard({ tech, onClick, onHire }: { tech: Technician; onClick: () => void; onHire: (tech: Technician) => void }) {
  return (
    <div className="group">
      <button onClick={onClick} className="text-left w-full">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 transition-all duration-300 ease-out hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative overflow-hidden rounded-xl">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800">
              <img
                src={tech.photo}
                alt={tech.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <span className={`absolute top-2 right-2 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 transition-colors duration-200 ${
              tech.status === "online" ? "bg-emerald-500" : tech.status === "busy" ? "bg-amber-500" : "bg-slate-400"
            }`} />
            {tech.status === "busy" && (
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-amber-500 text-white px-1.5 py-0.5 rounded-full shadow-lg">Sibuk</span>
            )}
            {tech.isVerified && (
              <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-indigo-500 text-white px-1.5 py-0.5 rounded-full shadow-lg">Verified</span>
            )}
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{tech.name}</h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">{tech.specialty}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{tech.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </button>
      <Button
        onClick={(e) => { e.stopPropagation(); onHire(tech); }}
        className="mt-2 w-full h-9 rounded-xl text-xs font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
        disabled={tech.status === "offline"}
      >
        <UserPlus className="h-3 w-3 mr-1.5" />
        {tech.status === "online" ? "Hire" : tech.status === "busy" ? "Sibuk" : "Offline"}
      </Button>
    </div>
  );
}

function TechnicianDrawer({ tech, onClose }: { tech: Technician; onClose: () => void }) {
  const [isChatting, setIsChatting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "tech" | "me"; time: string }>>([
    { id: "1", text: "Halo! Ada yang bisa saya bantu?", sender: "tech", time: "09:00" },
  ]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: message, sender: "me", time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) }]);
    setMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: "Baik, saya pahami. Bisa jelaskan lebih detail masalahnya?", sender: "tech", time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`} 
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div
        style={{ height: "100vh" }}
        className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white dark:bg-slate-900 z-50 shadow-2xl transition-all duration-300 ease-out flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {isChatting ? "Chat dengan Teknisi" : "Profil Teknisi"}
          </h2>
          <button onClick={handleClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {!isChatting ? (
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6 pb-8">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative h-24 w-24 rounded-2xl overflow-hidden ring-4 ring-indigo-100 dark:ring-indigo-900/50">
                  <Image src={tech.photo} alt={tech.name} fill className="object-cover" />
                </div>
                <span className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white dark:border-slate-900 ${tech.status === "online" ? "bg-emerald-500" : tech.status === "busy" ? "bg-amber-500" : "bg-slate-400"}`} />
              </div>
              <h3 className="mt-3 text-xl font-bold text-slate-800 dark:text-white">{tech.name}</h3>
              <p className="text-sm text-slate-500">{tech.specialty}</p>
              {tech.isVerified && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="h-3 w-3" />
                  Terverifikasi
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800 dark:text-white">{tech.rating}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{tech.reviewCount} review</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-800 dark:text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="font-bold">{tech.distance} km</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{tech.location}</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Tentang</h4>
              <p className="text-sm text-slate-500">{tech.bio}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                <Clock className="h-5 w-5 mx-auto text-indigo-500" />
                <p className="text-xs font-medium text-slate-800 dark:text-white mt-1">{tech.yearsExperience} Th</p>
                <p className="text-[10px] text-slate-500">Pengalaman</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                <div className="mx-auto text-emerald-500 font-bold text-lg">{tech.completedJobs}</div>
                <p className="text-[10px] text-slate-500 mt-1">Pekerjaan</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                <p className="text-xs font-medium text-slate-800 dark:text-white">{tech.responseTime}</p>
                <p className="text-[10px] text-slate-500">Respons</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Keahlian</h4>
              <div className="flex flex-wrap gap-2">
                {tech.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs text-slate-500">Kisaran Harga</p>
              <p className="text-lg font-bold text-indigo-500">{tech.priceRange}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={tech.status !== "online"}
                onClick={() => setIsChatting(true)}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {tech.status === "online" ? "Mulai Konsultasi" : "Teknisi Offline"}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="h-12 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  Hubungi
                </Button>
                <Button variant="outline" size="lg" className="h-12 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Chat Header */}
            <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <button onClick={() => setIsChatting(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft className="h-5 w-5 text-slate-500" />
              </button>
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-indigo-100 dark:ring-indigo-900/50">
                  <Image src={tech.photo} alt={tech.name} fill className="object-cover" />
                </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-white">{tech.name}</p>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === "me" 
                      ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 rounded-br-md" 
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-md"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-1.5 ${msg.sender === "me" ? "text-white/70" : "text-slate-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ketik pesan..."
                  className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200" 
                  onClick={handleSend}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function StorePage() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [hiredTech, setHiredTech] = useState<Technician | null>(null);
  const [showHireDrawer, setShowHireDrawer] = useState(false);
  const [showTechWarning, setShowTechWarning] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { cart } = useCart();

  const handleHire = (tech: Technician) => {
    if (cart.technicianBookings.length > 0) {
      setShowTechWarning(true);
    }
    setHiredTech(tech);
    setShowHireDrawer(true);
  };

  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || tech.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === "all" || tech.status === selectedStatus;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/customer" className="flex items-center gap-2 sm:gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={100} height={100} className="w-25 h-10" />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:block relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari teknisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="sm:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="h-5 w-5" />
            </button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/customer/community">
                <MessageCircle className="h-4 w-4 mr-2" />
                Community
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/customer/orders">
                <Package className="h-4 w-4 mr-2" />
                Pesanan Saya
              </Link>
            </Button>
            <NotificationDropdown role="customer" />
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900/50"
                />
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              
              {showProfileDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowProfileDropdown(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">Customer FixIn</p>
                      <p className="text-xs text-slate-500">customer@fixin.id</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/customer/settings"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Pengaturan
                      </Link>
                      </div>
                    <div className="py-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => router.push("/login")}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 sm:px-6 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {specialties.map((s) => (
              <button
                key={s.value}
                onClick={() => setSelectedSpecialty(s.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSpecialty === s.value
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "online" ? "all" : "online")}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedStatus === "online"
                  ? "bg-cyan-500 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <span className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${selectedStatus === "online" ? "bg-white" : "bg-cyan-500"}`} />
                Online
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
            <Link href="/customer/community" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              <MessageCircle className="h-4 w-4" />
              Community
            </Link>
            <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-2">
              <Link href="/customer/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Settings className="h-4 w-4" />
                Pengaturan
              </Link>
              <button
                onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        )}

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari teknisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className={`p-4 sm:p-6 ${selectedTech ? "overflow-hidden h-screen" : ""}`}>
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Consulting Teknisi</h1>
          <p className="mt-1 text-sm text-slate-500">Konsultasi gratis dengan teknisi berpengalaman</p>
        </div>

        {/* Warning Banner */}
        {cart.technicianBookings.length > 0 && (
          <div className="mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Kamu sudah memiliki teknisi di keranjang. Hiring teknisi baru akan mengganti yang sebelumnya.
            </p>
          </div>
        )}

        {/* Technician Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredTechnicians.length > 0 ? (
            filteredTechnicians.map((tech) => (
              <TechnicianCard key={tech.id} tech={tech} onClick={() => setSelectedTech(tech)} onHire={handleHire} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-lg font-medium text-slate-800 dark:text-white">Tidak ada teknisi ditemukan</p>
              <p className="mt-1 text-sm text-slate-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </main>

      {/* Technician Drawer */}
      {selectedTech && (
        <TechnicianDrawer tech={selectedTech} onClose={() => setSelectedTech(null)} />
      )}

      {/* Hire Drawer */}
      {showHireDrawer && hiredTech && (
        <HireDrawer tech={hiredTech} onClose={() => { setShowHireDrawer(false); setHiredTech(null); }} />
      )}
    </div>
  );
}

function HireDrawer({ tech, onClose }: { tech: Technician; onClose: () => void }) {
  const router = useRouter();
  const { addTechnicianBooking } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [orderType, setOrderType] = useState<"pickup" | "home">("pickup");
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [damageDesc, setDamageDesc] = useState("");
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleNext = () => {
    if (step === 1 && deviceName && deviceType && damageDesc) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    const visitFee = orderType === "pickup" ? 15000 : 25000;
    const checkFee = 25000;
    const total = visitFee + checkFee;

    const booking: TechnicianBooking = {
      id: `book-${Date.now()}`,
      techId: tech.id,
      techName: tech.name,
      techPhoto: tech.photo,
      techSpecialty: tech.specialty,
      orderType,
      deviceName,
      deviceType,
      damageDesc,
      baseFee: 0,
      visitFee,
      checkFee,
      total,
    };

    addTechnicianBooking(booking);
    handleClose();
    router.push("/customer/store/cart");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />
      <div
        style={{ height: "100vh" }}
        className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white dark:bg-slate-900 z-50 shadow-2xl transition-all duration-300 ease-out flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {step === 1 ? "Detail Pemesanan" : "Konfirmasi"}
          </h2>
          <button onClick={handleClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {step === 1 ? (
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6 pb-8">
            {/* Technician Info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="relative h-14 w-14 rounded-xl overflow-hidden">
                  <Image src={tech.photo} alt={tech.name} fill className="object-cover" />
                </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800 dark:text-white">{tech.name}</p>
                  {tech.isVerified && (
                    <span className="text-[10px] font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full">Verified</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{tech.specialty}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{tech.rating}</span>
                  </span>
                  <span className="text-xs text-slate-400">{tech.completedJobs} job</span>
                  <span className="text-xs text-slate-400">{tech.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Tipe Layanan</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType("pickup")}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    orderType === "pickup"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  Pickup Service
                </button>
                <button
                  onClick={() => setOrderType("home")}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    orderType === "home"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  Home Service
                </button>
              </div>
            </div>

            {/* Device Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Nama/Merek Perangkat</label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Contoh: MacBook Pro 2021"
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Jenis Perangkat</label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  <option value="">Pilih jenis</option>
                  <option value="laptop">Laptop</option>
                  <option value="pc">PC Desktop</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Deskripsi Kerusakan</label>
                <textarea
                  value={damageDesc}
                  onChange={(e) => setDamageDesc(e.target.value)}
                  placeholder="Jelaskan kerusakan yang dialami..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!deviceName || !deviceType || !damageDesc}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjut
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6 pb-8">
            {/* Summary */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
              <div className="flex items-center gap-3">
<div className="relative h-14 w-14 rounded-xl overflow-hidden">
                  <Image src={tech.photo} alt={tech.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{tech.name}</p>
                  <p className="text-xs text-slate-500">{tech.specialty}</p>
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tipe Layanan</span>
                  <span className="font-medium text-slate-800 dark:text-white">{orderType === "pickup" ? "Pickup Service" : "Home Service"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Perangkat</span>
                  <span className="font-medium text-slate-800 dark:text-white">{deviceName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Jenis</span>
                  <span className="font-medium text-slate-800 dark:text-white capitalize">{deviceType}</span>
                </div>
              </div>
            </div>

            {tech.status === "busy" && (
              <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Teknisi sedang sibuk. Pesanan mungkin akan lama ditangani.
                </p>
              </div>
            )}

            {/* Price Info */}
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400">Biaya {orderType === "pickup" ? "Penjemputan" : "Kunjungan"}</span>
                  <span className="font-medium text-indigo-800 dark:text-indigo-200">Rp 15.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400">Biaya Pengecekan</span>
                  <span className="font-medium text-indigo-800 dark:text-indigo-200">Rp 25.000</span>
                </div>
                <div className="border-t border-indigo-200 dark:border-indigo-800 pt-2 flex justify-between">
                  <span className="font-semibold text-indigo-800 dark:text-indigo-200">Total Estimasi</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-300">Rp 40.000</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleConfirm}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg hover:from-indigo-600 hover:to-indigo-700"
              >
                Konfirmasi Pemesanan
              </Button>
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full h-12 rounded-xl"
              >
                Kembali
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
