"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserApi } from "@/hooks/api/useUserApi";

export default function HomePage() {
	const { user } = useUserApi();
	return (
		<div className="flex h-full w-full flex-col">
			{user.isSuccess ? (
				<Link href="/chat/78457">
					<Button>Start Chatting</Button>
				</Link>
			) : (
				"Loading..."
			)}
		</div>
	);
}
