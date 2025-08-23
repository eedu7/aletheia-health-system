import React from "react";
import { PromptInput } from "@/app/conversations/_components/PromptInput";

interface ConversationsPageViewProps {
	conversationId: string;
}

export const ConversationsPageView = ({ conversationId }: ConversationsPageViewProps) => {
	if (conversationId === "new") {
		return <PromptInput />;
	}

	return <div>ConversationsPageView</div>;
};
