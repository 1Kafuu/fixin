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

const userStats = [
  { title: "Total Users", value: "12,847", subtitle: "+2,341 this month", icon: Users, color: "bg-blue-50 dark:bg-blue-900/30" },
  { title: "Customers", value: "11,523", subtitle: "89.7% of total", icon: Users, color: "bg-emerald-50 dark:bg-emerald-900/30" },
  { title: "Technicians", value: "1,284", subtitle: "10.0% of total", icon: Wrench, color: "bg-violet-50 dark:bg-violet-900/30" },
  { title: "Admin Users", value: "40", subtitle: "0.3% of total", icon: Shield, color: "bg-amber-50 dark:bg-amber-900/30" },
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
  { id: "U10", name: "Rina Susilowati", email: "rina.susilowati@tech.id", avatar: null, role: "Technician", status: "Active", registered: "2023-09-18", bookings: 89 },
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

function UserAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
  const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
  const colorIndex = name.length % colors.length;
  return (
    <div className={cn(sizeClasses[size], colors[colorIndex], "flex items-center justify-center rounded-full text-white font-medium")}>
      {initials}
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const config: Record<UserRole, string> = {
    Customer: "bg-blue-50 text-blue-700",
    Technician: "bg-violet-50 text-violet-700",
    Admin: "bg-amber-50 text-amber-700",
  };
  return <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", config[role])}>{role}</span>;
}

function UserFormModal({
  user,
  open,
  onClose,
  onSave
}: {
  user?: User | null;
  open: boolean;
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

  if (!open) return null;

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
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Customer">Customer</option>
              <option value="Technician">Technician</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEdit ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function UserDetailModal({ user, open, onClose }: { user: User; open: boolean; onClose: () => void }) {
  const bookings = mockUserBookings[user.id] || [];

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="User Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <UserAvatar name={user.name} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <RoleBadge role={user.role} />
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {user.phone || "No phone"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined {user.registered}
              </span>
            </div>
          </div>
        </div>

        {user.address && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
            <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">{user.address}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card text-center">
            <p className="text-2xl font-bold">{user.bookings}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </div>
          <div className="p-4 rounded-lg border bg-card text-center">
            <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Completed").length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="p-4 rounded-lg border bg-card text-center">
            <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Pending" || b.status === "In Progress").length}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
        </div>

        {bookings.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Bookings</h4>
            <div className="space-y-2">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.service}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={booking.status} />
                    <p className="text-sm font-medium mt-1">Rp {booking.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(extendedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || `U${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      avatar: null,
      role: userData.role || "Customer",
      status: userData.status || "Active",
      registered: userData.registered || new Date().toISOString().split("T")[0],
      bookings: 0,
      phone: userData.phone,
      address: userData.address,
    };
    setUsers([newUser, ...users]);
  };

  const handleEditUser = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(users.map((u) => u.id === editingUser.id ? { ...u, ...userData } as User : u));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const statusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case "Active": return "bg-emerald-50 text-emerald-700";
      case "Inactive": return "bg-slate-50 text-slate-700";
      case "Pending": return "bg-amber-50 text-amber-700";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage all users in the system"
        actions={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          placeholder="Search users..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full sm:w-80"
        />
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "All")}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Technician">Technician</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "All")}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Role</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Registered</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Bookings</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", statusBadgeColor(user.status))}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{user.registered}</td>
                  <td className="px-4 py-3 text-sm">{user.bookings}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setViewingUser(user)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No users found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <UserFormModal
        user={null}
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />

      {editingUser && (
        <UserFormModal
          user={editingUser}
          open={true}
          onClose={() => setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}

      {viewingUser && (
        <UserDetailModal
          user={viewingUser}
          open={true}
          onClose={() => setViewingUser(null)}
        />
      )}
    </div>
  );
}
