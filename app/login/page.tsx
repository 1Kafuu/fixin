"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Shield, Wrench, ArrowLeft } from "lucide-react";

const dummyAccounts = [
  {
    role: "admin",
    label: "Admin",
    icon: Shield,
    color: "blue",
    credentials: [
      { email: "admin@fixin.id", password: "admin123" },
    ],
  },
  {
    role: "technician",
    label: "Teknisi",
    icon: Wrench,
    color: "amber",
    credentials: [
      { email: "teknisi@fixin.id", password: "teknisi123" },
    ],
  },
  {
    role: "customer",
    label: "Customer",
    icon: User,
    color: "emerald",
    credentials: [
      { email: "customer@fixin.id", password: "customer123" },
    ],
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    for (const account of dummyAccounts) {
      const cred = account.credentials.find(
        (c) => c.email === email && c.password === password
      );
      if (cred) {
        router.push("/" + account.role);
        return;
      }
    }
    setError("Email atau password salah");
  };

  const handleDemoLogin = (roleEmail: string, rolePassword: string) => {
    setEmail(roleEmail);
    setPassword(rolePassword);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FixIn Logo" width={100} height={100} className="h-10 w-25" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Masuk ke FixIn</h1>
            <p className="mt-2 text-sm text-slate-500">Masuk dengan akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 pr-12 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl transition-all"
            >
              Masuk
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-xs text-slate-500 mb-3">Demo Accounts</p>
            <div className="space-y-2">
              {dummyAccounts.map((account) => (
                <div
                  key={account.role}
                  className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 p-3"
                >
                  <div className="flex items-center gap-2">
                    <account.icon className="h-4 w-4 text-slate-500" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{account.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin(account.credentials[0].email, account.credentials[0].password)}
                    className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                  >
                    Use Demo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
