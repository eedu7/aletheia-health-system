"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { PromptInput } from "@/app/conversations/_components/PromptInput";
import { useConversation } from "@/hooks/api/useConversation";
import { useMessage } from "@/hooks/api/useMessage";

// TODO: Add metadata

export default function ConversationPage() {
	const { createConversation } = useConversation();
	const { createMessage } = useMessage();
	const router = useRouter();

	const onSubmit = async (value: string) => {
		try {
			const newConversation = await createConversation.mutateAsync({
				title: value,
			});
			await createMessage.mutateAsync({
				conversationId: newConversation.id,
				content: value,
			});
			router.push(`/conversations/${newConversation.id}`);
		} catch (error) {
			alert(`Error creating conversation: ${error}`);
		}
	};
	return (
		<div className="grid h-full place-items-center">
			<PromptInput
				className="max-w-3xl"
				onSubmit={onSubmit}
				disabled={createMessage.isPending || createConversation.isPending}
			/>
		</div>
	);
}
