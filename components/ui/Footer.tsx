"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function Footer() {
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
					<div className="mt-4 grid grid-cols-2 gap-3">
						<Image src="/bca.png" alt="BCA" width={80} height={40} className="h-10 w-auto object-cover" />
						<Image src="/gopay-blue.jpg" alt="GoPay" width={80} height={40} className="h-10 w-auto object-cover" />
						<Image src="/dana.png" alt="DANA" width={80} height={40} className="h-10 w-auto object-cover" />
						<Image src="/ovo.jpg" alt="OVO" width={80} height={40} className="h-10 w-auto object-cover" />
					</div>
				</div>
				<div>
					<h4 className="font-bold text-foreground">Interact with FixIn</h4>
					<div className="mt-4 flex gap-3">
						{[FaFacebook, FaInstagram, MessageCircle, Phone].map(
							(Icon, i) => (
								<div
									key={i}
									className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 text-white"
								>
									<Icon className="h-4 w-4" />
								</div>
							),
						)}
					</div>
					<div className="mt-4 space-y-2 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-blue-500" /> 0898 3567 8195
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4 text-blue-500" />
							<span>cs.support@fix.in</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
