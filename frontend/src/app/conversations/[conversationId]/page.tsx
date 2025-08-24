import React from "react";
import { ConversationsPageView } from "@/app/conversations/_components/ConversationsPageView";

interface ConversationsPageProps {
	params: Promise<{ conversationId: string }>;
}

export default async function ConversationsIDPage({ params }: ConversationsPageProps) {
	const { conversationId } = await params;

	return <ConversationsPageView conversationId={conversationId} />;
}
