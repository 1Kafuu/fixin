import type { Metadata } from "next";
import IndexClient from "./page-client";

export const metadata: Metadata = {
  title: "FixIn — Geek Talk. Pro Fix. All In One App",
  description: "Laptop sehat, dompet selamat. Teknisi diverifikasi, solusi dijamin.",
};

export default function Index() {
  return <IndexClient />;
}
