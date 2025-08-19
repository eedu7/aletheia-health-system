import React from "react";
import { StaticPageNavbar } from "@/app/(static)/_components/StaticPageNavbar";

export const StaticPageHeader = () => {
	return (
		<div className="bg-[#FFFAFA] shadow">
			<header className="mx-auto flex max-w-7xl items-center justify-between p-4">
				<h1 className="text-xl font-bold">Aletheia AI</h1>
				<StaticPageNavbar />
			</header>
		</div>
	);
};
