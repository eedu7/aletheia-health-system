import { Metadata } from "next";
import React from "react";
import { ConversationsPageView } from "@/app/conversations/_components/ConversationsPageView";

interface ConversationsPageProps {
	params: Promise<{ conversationId: string }>;
}
// TODO: Generate metadata, server side rendering
export const metadata: Metadata = {
	title: "Conversation - Aletheia Health",
	description: "Conversation",
	keywords: ["conversation"],
};

export default async function ConversationsIDPage({ params }: ConversationsPageProps) {
	const { conversationId } = await params;

	return <ConversationsPageView conversationId={conversationId} />;
}
