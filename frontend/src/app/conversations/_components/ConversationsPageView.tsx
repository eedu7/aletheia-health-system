"use client";

import React from "react";
import { PromptInput } from "@/app/conversations/_components/PromptInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/hooks/api/useConversation";
import { cn } from "@/lib/utils";

interface ConversationsPageViewProps {
	conversationId: string;
}

export const ConversationsPageView = ({ conversationId }: ConversationsPageViewProps) => {
	const { conversationById } = useConversation({
		conversationId,
	});
	const messages = conversationById.data?.messages;

	// TODO: Add a blur on the top and bottom of the Scroll Area
	return (
		<main className="mx-auto max-w-4xl">
			<div className="flex h-screen flex-col p-4">
				<ScrollArea className="min-h-0 flex-1">
					<ul className="flex min-h-full flex-col justify-end space-y-2">
						{messages?.map(({ id, sender, content }) => (
							<li key={id} className={cn(sender === "user" && "bg-zinc-100", "w-fit rounded-lg p-2")}>
								{content}
							</li>
						))}
					</ul>
				</ScrollArea>
				<div className="mt-1 flex w-full items-center justify-center">
					<PromptInput
						onSubmit={(value: string) => {
							console.log(value);
						}}
					/>
				</div>
			</div>
		</main>
	);
};
