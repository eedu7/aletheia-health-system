import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ConversationsPageProps {
	params: Promise<{ conversationId?: string[] }>;
}

export default async function ConversationsPage({ params }: ConversationsPageProps) {
	const { conversationId } = await params;

	return (
		<div className="flex h-full items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardDescription>ChatID:</CardDescription>
					{conversationId && <CardTitle>{conversationId[0]}</CardTitle>}
				</CardHeader>
			</Card>
		</div>
	);
}
