"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Wrench,
  Shield,
  Plus,
  Eye,
  Trash2,
  X,
  Calendar,
  Mail,
  Phone,
  ClipboardList,
  ExternalLink,
  Edit2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StatusBadge,
  StatCard,
  ActionMenu,
  SearchInput,
  FilterTabs,
  Modal,
  PageHeader,
} from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

// Types
type UserRole = "Customer" | "Technician" | "Admin";
type UserStatus = "Active" | "Inactive" | "Pending";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  registered: string;
  bookings: number;
  phone?: string;
  address?: string;
}

interface Booking {
  id: string;
  service: string;
  date: string;
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  price: number;
}

// Mock data
const userStats = [
  { title: "Total Users", value: "12,847", subtitle: "+2,341 this month", icon: Users, color: "bg-blue-50" },
  { title: "Customers", value: "11,523", subtitle: "89.7% of total", icon: Users, color: "bg-emerald-50" },
  { title: "Technicians", value: "1,284", subtitle: "10.0% of total", icon: Wrench, color: "bg-violet-50" },
  { title: "Admin Users", value: "40", subtitle: "0.3% of total", icon: Shield, color: "bg-amber-50" },
];

const extendedUsers: User[] = [
  { id: "U1", name: "Ahmad Wijaya", email: "ahmad.wijaya@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-01-15", bookings: 12, phone: "0812-3456-7890", address: "Jl. Sudirman No. 123, Jakarta" },
  { id: "U2", name: "Budi Santoso", email: "budi.santoso@tech.id", avatar: null, role: "Technician", status: "Active", registered: "2023-08-22", bookings: 156, phone: "0813-4567-8901", address: "Jl. Gatot Subroto No. 45, Jakarta" },
  { id: "U3", name: "Siti Rahayu", email: "siti.rahayu@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-03-10", bookings: 5, phone: "0856-7890-1234", address: "Jl. Thamrin No. 78, Jakarta" },
  { id: "U4", name: "Dewi Lestari", email: "dewi.lestari@email.com", avatar: null, role: "Customer", status: "Inactive", registered: "2023-11-28", bookings: 0, phone: "0821-5678-9012", address: "Jl. Kemang No. 56, Jakarta" },
  { id: "U5", name: "Rizky Pratama", email: "rizky.pratama@tech.id", avatar: null, role: "Technician", status: "Active", registered: "2023-05-14", bookings: 234, phone: "0855-2345-6789", address: "Jl. Puri Indah No. 90, Jakarta" },
  { id: "U6", name: "Admin FixIn", email: "admin@fixin.id", avatar: null, role: "Admin", status: "Active", registered: "2023-01-01", bookings: 0 },
  { id: "U7", name: "Maya Putri", email: "maya.putri@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-02-20", bookings: 8, phone: "0878-8765-4321", address: "Jl. Kebayoran Baru No. 12, Jakarta" },
  { id: "U8", name: "Joko Widodo", email: "joko.jwd@tech.id", avatar: null, role: "Technician", status: "Pending", registered: "2024-06-01", bookings: 12, phone: "0811-2233-4455", address: "Jl. Melati No. 25, Jakarta" },
  { id: "U9", name: "Fajar Nugroho", email: "fajar.nugroho@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-05-12", bookings: 3 },
  { id: "U10", name: "Rina Susilowati", email: "rina.susilowati@email.com", avatar: null, role: "Technician", status: "Active", registered: "2023-09-18", bookings: 89 },
  { id: "U11", name: "Hendra Wijaya", email: "hendra.wijaya@email.com", avatar: null, role: "Customer", status: "Inactive", registered: "2023-07-22", bookings: 0 },
  { id: "U12", name: "Sari Dewi", email: "sari.dewi@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-04-05", bookings: 7 },
  { id: "U13", name: "Asep Sudrajat", email: "asep.sudrajat@tech.id", avatar: null, role: "Technician", status: "Pending", registered: "2024-06-15", bookings: 5 },
  { id: "U14", name: "Nina Marlina", email: "nina.marlina@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-01-28", bookings: 15 },
  { id: "U15", name: "Dedi Kurniawan", email: "dedi.kurniawan@email.com", avatar: null, role: "Customer", status: "Active", registered: "2023-12-10", bookings: 22 },
];

const mockUserBookings: Record<string, Booking[]> = {
  U1: [
    { id: "BK-001", service: "Laptop Screen Replacement", date: "2024-01-20", status: "Completed", price: 250000 },
    { id: "BK-002", service: "Virus Removal", date: "2024-01-18", status: "Completed", price: 150000 },
    { id: "BK-003", service: "Keyboard Replacement", date: "2024-01-15", status: "In Progress", price: 180000 },
  ],
  U2: [
    { id: "BK-010", service: "Hardware Repair", date: "2024-01-19", status: "Completed", price: 350000 },
    { id: "BK-011", service: "Data Recovery", date: "2024-01-17", status: "Completed", price: 400000 },
  ],
  U3: [{ id: "BK-020", service: "Windows Installation", date: "2024-01-20", status: "Pending", price: 200000 }],
  U5: [
    { id: "BK-030", service: "RAM Upgrade", date: "2024-01-21", status: "Confirmed", price: 220000 },
    { id: "BK-031", service: "SSD Installation", date: "2024-01-22", status: "Pending", price: 350000 },
  ],
};

// Avatar
function UserAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
  const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
  const colorIndex = name.length % colors.length;
  return (
    <div className={`${sizeClasses[size]} ${colors[colorIndex]} flex items-center justify-center rounded-full text-white font-medium`}>
      {initials}
    </div>
  );
}

// Role Badge
function RoleBadge({ role }: { role: UserRole }) {
  const config: Record<UserRole, string> = {
    Customer: "bg-blue-50 text-blue-700",
    Technician: "bg-violet-50 text-violet-700",
    Admin: "bg-amber-50 text-amber-700",
  };
  return <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", config[role])}>{role}</span>;
}

// Add/Edit User Modal
function UserFormModal({ 
  user, 
  onClose, 
  onSave 
}: { 
  user?: User | null; 
  onClose: () => void; 
  onSave: (user: Partial<User>) => void;
}) {
  const isEdit = !!user;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    role: user?.role || "Customer" as UserRole,
    status: user?.status || "Active" as UserStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: user?.id || `U${Date.now()}`,
      avatar: null,
      registered: user?.registered || new Date().toISOString().split("T")[0],
      bookings: user?.bookings || 0,
    });
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit User" : "Add New User"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg b
