"use client";

import { useEffect, useRef, useState } from "react";

export function SlideUp({
	children,
	className = "",
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

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

	return (
		<div
			ref={ref}
			className={`transition-all duration-500 ease-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

export function CardSlideUp({
	children,
	index,
	className = "",
}: {
	children: React.ReactNode;
	index: number;
	className?: string;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

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

	return (
		<div
			ref={ref}
			className={`transition-all duration-500 ease-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			} ${className}`}
			style={{ transitionDelay: `${index * 100}ms` }}
		>
			{children}
		</div>
	);
}

export function SlideUpRow({
	children,
	index,
	className = "",
}: {
	children: React.ReactNode;
	index: number;
	className?: string;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLTableRowElement>(null);

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

	return (
		<tr
			ref={ref}
			className={`transition-all duration-500 ease-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
			} ${className}`}
			style={{ transitionDelay: `${index * 80}ms` }}
		>
			{children}
		</tr>
	);
}
