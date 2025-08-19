import Link from "next/link";
import React from "react";
import { StaticPageNavbar } from "@/components/StaticPageNavbar";

export const StaticPageHeader = () => {
	return (
		<div className="bg-[#FFFAFA] shadow">
			<header className="mx-auto flex max-w-7xl items-center justify-between p-4">
				<Link href="/public" className="text-xl font-bold">
					Aletheia AI
				</Link>
				<StaticPageNavbar />
			</header>
		</div>
	);
};
