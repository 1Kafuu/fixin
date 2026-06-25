"use client";

import { useState } from "react";
import {
  Users,
  Wrench,
  Shield,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Eye,
  X,
} from "lucide-react";

// Mock data
const userStats = [
  {
    title: "Total Users",
    value: "12,847",
    users: "+2,341 this month",
    icon: Users,
    color: "blue",
  },
  {
    title: "Customers",
    value: "11,523",
    users: "89.7% of total",
    icon: Users,
    color: "emerald",
  },
  {
    title: "Technicians",
    value: "1,284",
    users: "10.0% of total",
    icon: Wrench,
    color: "violet",
  },
  {
    title: "Admin Users",
    value: "40",
    users: "0.3% of total",
    icon: Shield,
    color: "amber",
  },
];

const usersData = [
  {
    id: 1,
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@email.com",
    avatar: null,
    role: "Customer",
    status: "Active",
    registered: "2024-01-15",
    bookings: 12,
  },
  {
    id: 2,
    name: "Budi Santoso",
    email: "budi.santoso@tech.id",
    avatar: null,
    role: "Technician",
    status: "Active",
    registered: "2023-08-22",
    bookings: 156,
  },
  {
    id: 3,
    name: "Siti Rahayu",
    email: "siti.rahayu@email.com",
    avatar: null,
    role: "Customer",
    status: "Active",
    registered: "2024-03-10",
    bookings: 5,
  },
  {
    id: 4,
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    avatar: null,
    role: "Customer",
    status: "Inactive",
    registered: "2023-11-28",
    bookings: 0,
  },
  {
    id: 5,
    name: "Rizky Pratama",
    email: "rizky.pratama@tech.id",
    avatar: null,
    role: "Technician",
    status: "Active",
    registered: "2023-05-14",
    bookings: 234,
  },
  {
    id: 6,
    name: "Admin FixIn",
    email: "admin@fixin.id",
    avatar: null,
    role: "Admin",
    status: "Active",
    registered: "2023-01-01",
    bookings: 0,
  },
  {
    id: 7,
    name: "Maya Putri",
    email: "maya.putri@email.com",
    avatar: null,
    role: "Customer",
    status: "Active",
    registered: "2024-02-20",
    bookings: 8,
  },
  {
    id: 8,
    name: "Joko Widodo",
    email: "joko.jwd@tech.id",
    avatar: null,
    role: "Technician",
    status: "Pending",
    registered: "2024-06-01",
    bookings: 12,
  },
];

// Avatar component
function UserAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];

  const colorIndex = name.length % colors.length;

  return (
    <div
      className={`${sizeClasses[size]} ${colors[colorIndex]} flex items-center justify-center rounded-full text-white font-medium`}
    >
      {initials}
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Inactive: "bg-muted text-muted-foreground border-border",
    Pending: "bg-amber-50 text-amber-600 border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Pending"
            ? "bg-amber-500"
            : "bg-muted-foreground"
        }`}
      />
      {status}
    </span>
  );
}

// Role badge component
function RoleBadge({ role }: { role: string }) {
  const roleStyles = {
    Customer: "bg-blue-50 text-blue-600",
    Technician: "bg-violet-50 text-violet-600",
    Admin: "bg-amber-50 text-amber-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        roleStyles[role as keyof typeof roleStyles] || roleStyles.Customer
      }`}
    >
      {role}
    </span>
  );
}

// Stat Card component
function StatCard({
  title,
  value,
  users,
  icon: Icon,
  color,
}: (typeof userStats)[0]) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-500 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
    violet: "bg-violet-50 text-violet-500 border-violet-100",
    amber: "bg-amber-50 text-amber-500 border-amber-100",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{users}</p>
        </div>
        <div className={`rounded-lg border p-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

// Action dropdown menu
function ActionMenu({ userId }: { userId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border border-border bg-background py-1 shadow-lg">
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent">
              <Eye className="h-4 w-4" />
              View Details
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent">
              <Edit2 className="h-4 w-4" />
              Edit User
            </button>
            <hr className="my-1 border-border" />
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-accent">
              <Trash2 className="h-4 w-4" />
              Delete User
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Extended dummy data for pagination demo
  const extendedUsers = [
    ...usersData,
    { id: 9, name: "Fajar Nugroho", email: "fajar.nugroho@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-05-12", bookings: 3 },
    { id: 10, name: "Rina Susilowati", email: "rina.susilowati@email.com", avatar: null, role: "Technician", status: "Active", registered: "2023-09-18", bookings: 89 },
    { id: 11, name: "Hendra Wijaya", email: "hendra.wijaya@email.com", avatar: null, role: "Customer", status: "Inactive", registered: "2023-07-22", bookings: 0 },
    { id: 12, name: "Sari Dewi", email: "sari.dewi@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-04-05", bookings: 7 },
    { id: 13, name: "Asep Sudrajat", email: "asep.sudrajat@tech.id", avatar: null, role: "Technician", status: "Pending", registered: "2024-06-15", bookings: 5 },
    { id: 14, name: "Nina Marlina", email: "nina.marlina@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-01-28", bookings: 15 },
    { id: 15, name: "Dedi Kurniawan", email: "dedi.kurniawan@email.com", avatar: null, role: "Customer", status: "Active", registered: "2023-12-10", bookings: 22 },
    { id: 16, name: "Lisa Permatasari", email: "lisa.permatasari@email.com", avatar: null, role: "Admin", status: "Active", registered: "2023-03-15", bookings: 0 },
    { id: 17, name: "Agus Setiawan", email: "agus.setiawan@tech.id", avatar: null, role: "Technician", status: "Active", registered: "2023-06-08", bookings: 178 },
    { id: 18, name: "Wati Rahmawati", email: "wati.rahmawati@email.com", avatar: null, role: "Customer", status: "Inactive", registered: "2024-02-14", bookings: 1 },
    { id: 19, name: "Bambang Sutrisno", email: "bambang.sutrisno@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-03-22", bookings: 9 },
    { id: 20, name: "Yuniarti", email: "yuniarti@email.com", avatar: null, role: "Customer", status: "Active", registered: "2024-05-30", bookings: 4 },
  ];

  const filteredUsers = extendedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and monitor all users in the FixIn platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Users Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Registered
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Bookings
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} size="md" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(user.registered).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{user.bookings}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu userId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)}</span> of{" "}
            <span className="font-medium text-foreground">{filteredUsers.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Role</label>
                <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="Customer">Customer</option>
                  <option value="Technician">Technician</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
