import { notFound } from "next/navigation";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChatPageProps {
	params: { chatId: string };
}

export default async function ChatPage({ params }: ChatPageProps) {
	const chatId = await params.chatId;
	if (!chatId) return notFound();
	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardDescription>ChatID:</CardDescription>
					<CardTitle>{chatId}</CardTitle>
				</CardHeader>
			</Card>
		</div>
	);
}
