"use client";

import { Link2 } from "lucide-react";
import Link from "next/link";
import { useUserApi } from "@/hooks/api/useUserApi";

export default function HomePage() {
	const { user } = useUserApi();
	return (
		<div className="mb-24 max-w-2xl space-y-4">
			<h1 className="text-5xl font-bold text-gray-700">Smarter Healthcare, Powered by Compassion and AI</h1>
			<p className="text-gray-600">
				Aletheia Health System brings people and technology together to make healthcare more personal, accurate,
				and accessible. From early cancer detection to secure health records and supportive AI chatbots, we
				focus on empowering patients and doctors to make better decisions — because every life matters.
			</p>
			{user.isSuccess && (
				<Link
					href="/conversations/"
					className="hover:border-primary text-primary flex w-fit gap-2 border-b-2 border-transparent font-bold transition-colors duration-300"
				>
					Get Started <Link2 />
				</Link>
			)}
		</div>
	);
}
