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
} from "../../../components/admin";
import { Pagination } from "../../../components/admin/Pagination";

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

// User Detail Modal
function UserDetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  const router = useRouter();
  const userBookings = mockUserBookings[user.id] || [];
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  const formatPrice = (price: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  return (
    <Modal open onClose={onClose} title={user.name} subtitle={user.id} size="lg">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
            <UserAvatar name={user.name} size="lg" />
            <div>
              <div className="flex gap-2 mb-1">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            {user.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{user.phone}</div>}
            {user.address && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{user.address}</div>}
            <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" />Registered: {formatDate(user.registered)}</div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold mb-3">Booking Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-background p-3 text-center">
                <p className="text-2xl font-bold">{user.bookings}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="rounded-lg bg-background p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{userBookings.filter((b) => b.status === "Completed").length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
            <button onClick={() => router.push(`/admin/booking?user_id=${user.id}`)} className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
              <ExternalLink className="h-4 w-4" />View All Bookings
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-3">Recent Bookings</h3>
          {userBookings.length > 0 ? (
            <div className="space-y-3">
              {userBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between rounded-lg bg-background p-3">
                  <div>
                    <p className="text-sm font-medium">{booking.service}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(booking.date)}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={booking.status} />
                    <p className="mt-1 text-xs font-medium">{formatPrice(booking.price)}</p>
                  </div>
                </div>
              ))}
              {userBookings.length > 3 && (
                <button onClick={() => router.push(`/admin/booking?user_id=${user.id}`)} className="w-full text-center text-sm text-blue-600 hover:underline">
                  View all {userBookings.length} bookings →
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No booking history</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = extendedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <PageHeader title="User Management" description="Manage and monitor all users in the FixIn platform">
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
          <Plus className="h-4 w-4" />Add User
        </button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, i) => (
          <div key={stat.title} style={{ animationDelay: `${i * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="animate-slideUp rounded-xl border border-border bg-card shadow-sm" style={{ animationDelay: "400ms" }}>
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
          <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }} placeholder="Search users..." className="max-w-md" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Registered</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Bookings</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} size="md" />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(user.registered).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className="px-4 py-3 text-sm">{user.bookings}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      items={[
                        { label: "View Details", icon: Eye, onClick: () => setSelectedUser(user) },
                        { label: "Edit User", icon: Edit2, onClick: () => {} },
                        { label: "Delete User", icon: Trash2, variant: "danger", onClick: () => {} },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
