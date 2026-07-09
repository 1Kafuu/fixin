"use client";

import { Play, MessageCircle, Phone, Mail, Check } from "lucide-react";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useRef, useState } from "react";

function useSlideUpOnScroll() {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return { ref, isVisible };
}

function SlideUp({
	children,
	className = "",
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const { ref, isVisible } = useSlideUpOnScroll();

	return (
		<div
			ref={ref}
			className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

function useCountUp(target: number, duration: number, isActive: boolean) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!isActive) return;
		let start = 0;
		const end = parseInt(target.toString().replace(/\./g, ""), 10);
		const incrementTime = (duration / end) * 10;
		const timer = setInterval(() => {
			start += Math.ceil(end / (duration / 10));
			if (start >= end) {
				setCount(end);
				clearInterval(timer);
			} else {
				setCount(start);
			}
		}, incrementTime);
		return () => clearInterval(timer);
	}, [isActive, target, duration]);

	const formatCount = (n: number) => {
		return n.toLocaleString("id-ID");
	};

	return { count: formatCount(count), isActive };
}

function Counter({ value, isActive }: { value: string; isActive: boolean }) {
	const numericValue = parseInt(value.replace(/\./g, "").replace(/\D/g, ""), 10) || 0;
	const { count } = useCountUp(numericValue, 1500, isActive);
	return <span>{isActive ? count : "0"}</span>;
}

function CounterWithRoll({ value, base }: { value: string; base: number }) {
	const [displayValue, setDisplayValue] = useState("0");
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true);
					observer.unobserve(el);

					let rollCount = 0;
					const maxRolls = 15;
					const rollInterval = setInterval(() => {
						const randomNum = Math.floor(Math.random() * base);
						if (value.includes("dari")) {
							setDisplayValue(`${Math.min(randomNum, 9)} dari 10`);
						} else if (value.includes("+")) {
							setDisplayValue(`${randomNum.toLocaleString("id-ID")}+`);
						} else {
							setDisplayValue(randomNum.toLocaleString("id-ID"));
						}
						rollCount++;
						if (rollCount >= maxRolls) {
							clearInterval(rollInterval);
							setDisplayValue(value);
						}
					}, 80);
				}
			},
			{ threshold: 0.5 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [base, hasAnimated, value]);

	return (
		<div ref={ref} className="text-3xl font-bold text-foreground">
			{displayValue}
		</div>
	);
}

function Logo() {
	return (
		<div className="flex  gap-2">
			<Image
				src="/logo.svg"
				alt="FixIn Logo"
				width={40}
				height={36}
				className="h-20 w-25"
			/>
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
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
			<Logo />
			<nav className="hidden items-center gap-8 text-sm text-foreground md:flex">
				<a href="#about" className="hover:text-blue-500">
					About
				</a>
				<a href="#how" className="hover:text-blue-500">
					How To Use
				</a>
				<a href="#service" className="hover:text-blue-500">
					Service
				</a>
				<a href="#contact" className="hover:text-blue-500">
					Contact
				</a>
				<a href="https://blog-fixin.framer.website/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
					Blog
				</a>
			</nav>
			<div className="flex items-center gap-4">
				<Link href="/login">
					<button className="rounded-lg border-2 border-blue-500 px-6 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
						Login
					</button>
				</Link>
				<button
					className="flex md:hidden p-2 text-foreground"
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label="Toggle menu"
				>
					{mobileOpen ? (
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
				</button>
			</div>

			{mobileOpen && (
				<div className="fixed inset-y-0 right-0 left-auto z-50 flex w-[75%] flex-col bg-background shadow-xl md:hidden">
					<button
						className="absolute right-6 top-6 p-2 text-foreground"
						onClick={() => setMobileOpen(false)}
						aria-label="Close menu"
					>
						<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<nav className="flex flex-col gap-6 pt-24 pl-8 text-xl text-foreground">
						<a href="#about" className="hover:text-blue-500 underline underline-offset-4" onClick={() => setMobileOpen(false)}>About</a>
						<a href="#how" className="hover:text-blue-500 underline underline-offset-4" onClick={() => setMobileOpen(false)}>How To Use</a>
						<a href="#service" className="hover:text-blue-500 underline underline-offset-4" onClick={() => setMobileOpen(false)}>Service</a>
						<a href="#contact" className="hover:text-blue-500 underline underline-offset-4" onClick={() => setMobileOpen(false)}>Contact</a>
						<a href="https://blog-fixin.framer.website/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 underline underline-offset-4" onClick={() => setMobileOpen(false)}>Blog</a>
					</nav>
				</div>
			)}
		</header>
	);
}

function Hero({ isDark }: { isDark: boolean }) {
	return (
		<section className="mx-auto max-w-7xl px-6">
			<div
				className={`relative overflow-hidden rounded-2xl px-6 py-16 md:py-20 h-150 w-full flex items-center justify-center ${
					isDark ? "bg-[oklch(0.15_0.02_250)]" : "bg-[oklch(0.93_0.01_250)]"
				}`}
				style={{
					backgroundImage: `radial-gradient(circle, ${isDark ? "oklch(0.35 0.02 250)" : "oklch(0.85 0.01 250)"} 1px, transparent 1px)`,
					backgroundSize: "20px 20px",
				}}
			>
				<div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
					<SlideUp className="flex items-center mb-6" delay={0}>
						<Image
							src="/icon.svg"
							alt="FixIn Logo"
							width={40}
							height={36}
							className="h-18 w-18"
						/>
					</SlideUp>
					<SlideUp delay={100}>
						<h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
							Geek Talk. Pro Fix
						</h1>
					</SlideUp>
					<SlideUp delay={200}>
						<p
							className={`mt-2 text-3xl font-medium md:text-4xl ${isDark ? "text-[oklch(0.70_0.02_250)]" : "text-[oklch(0.55_0.02_250)]"}`}
						>
							All In One App
						</p>
					</SlideUp>
					<SlideUp delay={300}>
						<p className="mt-4 text-sm text-foreground">
							Laptop sehat, dompet selamat
						</p>
					</SlideUp>
					<SlideUp delay={400}>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
							<Link href="/login">
								<button className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-4 font-semibold  text-xl text-white hover:opacity-90">
									<Play />
									Get Started
								</button>
							</Link>
						</div>
					</SlideUp>
				</div>
			</div>
		</section>
	);
}

function Stats({ isDark }: { isDark: boolean }) {
	return (
		<SlideUp>
			<section
				id="about"
				className="relative mx-auto max-w-5xl px-6 py-20 text-center"
			>
				<Sparkle className="absolute right-8 top-16 h-6 w-6 text-blue-500" />
				<Sparkle className="absolute left-8 bottom-8 h-5 w-5 text-blue-500" />
				<h2 className="text-3xl font-bold text-foreground md:text-4xl">
					Teknisi Diverifikasi, Solusi Dijamin
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
					Komunitas ribuan pengguna laptop aktif + teknisi berpengalaman yang
					sudah diverifikasi KTP & sertifikat. Tanya gratis ke sesama user, atau
					panggil teknisi rating 4.8+ yang datang ke tempatmu — semua
					transparan, harga di depan, garansi pengerjaan.
				</p>
				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{[
						{ n: "10.000+", l: "Masalah Teratasi", base: 10000 },
						{ n: "9 dari 10", l: "Merasa Puas", base: 9 },
						{ n: "1.500+", l: "Teknisi Ahli", base: 1500 },
					].map((s, i) => (
						<SlideUp key={s.l} delay={i * 150}>
							<div
								className={`rounded-2xl border-2 px-6 py-8 ${isDark ? "border-[oklch(0.30_0.02_245)] bg-[oklch(0.15_0.02_245)]" : "border-[oklch(0.85_0.05_245)] bg-white"}`}
							>
								<CounterWithRoll value={s.n} base={s.base} />
								<div className="mt-2 text-foreground">{s.l}</div>
							</div>
						</SlideUp>
					))}
				</div>
			</section>
		</SlideUp>
	);
}

function HowToUse({ isDark }: { isDark: boolean }) {
	const steps = [
		"Pilih Jenis Service (Home Service/Online Consultion)",
		"Deskripsikan Masalah Laptopmu, Dan Konfirmasi Booking",
		"Teknisi Profesional akan menyelesaikan masalahmu",
	];
	return (
		<SlideUp>
			<section id="how" className="mx-auto max-w-6xl px-6 py-16">
				<h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
					How To Use FixIn
				</h2>
				<div className="mt-12 grid items-center gap-10 md:grid-cols-2">
					<div
						className={`flex aspect-video items-center justify-center rounded-2xl ${isDark ? "bg-[oklch(0.25_0.02_250)]" : "bg-[oklch(0.55_0.01_250)]"}`}
					>
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/30">
							<Play className="h-10 w-10 fill-white text-white" />
						</div>
					</div>
					<div className="space-y-8">
						{steps.map((s, i) => (
							<SlideUp key={i} delay={i * 200}>
								<div className="flex items-start gap-4">
									<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
										{i + 1}
									</div>
									<p className="pt-1 text-foreground">{s}</p>
								</div>
							</SlideUp>
						))}
					</div>
				</div>
			</section>
		</SlideUp>
	);
}

function Services({ isDark }: { isDark: boolean }) {
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
		<SlideUp>
			<section id="service" className="mx-auto max-w-7xl px-6 py-16">
				<h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
					Service Categories
				</h2>
				<p className="mt-3 text-center text-sm text-foreground">
					Kami menyediakan berbagai service untuk mengatasi kendala laptopmu
				</p>
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{cats.map((c, i) => (
						<SlideUp key={c.title} delay={i * 150}>
							<div
								className={`rounded-2xl border p-6 shadow-sm ${isDark ? "border-[oklch(0.25_0.02_250)] bg-[oklch(0.15_0.02_250)]" : "border-[oklch(0.92_0.01_250)] bg-white"}`}
							>
								<h3 className="text-center text-lg font-bold text-foreground">
									{c.title}
								</h3>
								<p className="mt-3 text-center text-xs italic text-muted-foreground">
									"{c.sub}"
								</p>
								<ul className="mt-5 space-y-3">
									{c.items.map((it) => (
										<li
											key={it}
											className="flex items-start gap-2 text-xs text-foreground"
										>
											<Check
												className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-500"
												strokeWidth={3}
											/>
											<span>{it}</span>
										</li>
									))}
								</ul>
							</div>
						</SlideUp>
					))}
				</div>
			</section>
		</SlideUp>
	);
}

export default function IndexClient() {
	const { resolvedTheme, mounted } = useTheme();
	const isDark = mounted ? resolvedTheme === "dark" : false;

	return (
		<div className="min-h-screen bg-background" suppressHydrationWarning>
			<Header />
			<Hero isDark={isDark} />
			<Stats isDark={isDark} />
			<HowToUse isDark={isDark} />
			<Services isDark={isDark} />
			<Footer />
		</div>
	);
}
