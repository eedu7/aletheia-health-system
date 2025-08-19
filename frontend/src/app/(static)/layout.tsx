import React from "react";
import { StaticPageHeader } from "@/app/(static)/_components/StaticPageHeader";

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<StaticPageHeader />
			<div className="mx-auto h-full w-full max-w-7xl flex-1">{children}</div>
		</div>
	);
}
