import React from "react";
import { ConversationsPageView } from "@/app/conversations/_components/ConversationsPageView";

interface ConversationsPageProps {
	params: Promise<{ conversationId?: string[] }>;
}

export default async function ConversationsIDPage({ params }: ConversationsPageProps) {
	const { conversationId } = await params;

	return (
		<div className="flex h-full items-center justify-center">
			<ConversationsPageView conversationId={conversationId?.[0] ?? "new"} />
		</div>
	);
}
