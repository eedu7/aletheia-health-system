"use client";

import { useEffect, useRef, useState } from "react";
import { ChatFeatures } from "@/app/conversations/_components/ChatFeatures";
import { MarkdownRenderer } from "@/app/conversations/_components/MarkdownRenderer";
import { PromptInput } from "@/app/conversations/_components/PromptInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/hooks/api/useConversation";
import { useMessage } from "@/hooks/api/useMessage";
import { Message } from "@/lib/types/message";
import { cn } from "@/lib/utils";

interface ConversationsPageViewProps {
	conversationId: string;
}

export const ConversationsPageView = ({ conversationId }: ConversationsPageViewProps) => {
	const { conversationById } = useConversation({ conversationId });
	const conversation = conversationById.data?.messages;

	const [messages, setMessages] = useState<Message[]>([]);
	const { createMessage } = useMessage();

	const lastMessageRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		if (conversation) {
			setMessages(conversation);
		}
	}, [conversation]);

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const onSubmit = async (value: string) => {
		try {
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					sender: "user",
					content: value,
				},
			]);
			const response = await createMessage.mutateAsync({
				conversationId,
				content: value,
			});
			setMessages((prev) => [...prev, response]);
		} catch (error) {
			alert(`Error creating message: ${error}`);
		}
	};

	return (
		<main className="mx-auto max-w-4xl">
			<div className="flex h-screen flex-col p-4">
				<div className="relative min-h-0 flex-1">
					{/* Scroll Area with blur */}
					<ScrollArea className="h-full">
						<ul className="flex min-h-full flex-col justify-end space-y-2 py-2">
							{messages.map(({ id, sender, content }, index) => {
								const isLast = index === messages.length - 1;
								return (
									<li
										ref={isLast ? lastMessageRef : null}
										key={id}
										className={cn(
											"group prose w-full space-y-2 rounded-lg p-2",
											sender === "user" && "w-fit bg-zinc-100",
										)}
									>
										<MarkdownRenderer content={content} />

										{sender !== "user" && <ChatFeatures />}
									</li>
								);
							})}
						</ul>
					</ScrollArea>

					{/* Top blur */}
					<div className="pointer-events-none absolute top-0 right-0 left-0 h-6 bg-gradient-to-b from-white to-transparent" />
					{/* Bottom blur */}
					<div className="pointer-events-none absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t from-white to-transparent" />
				</div>

				<div className="mt-1 flex w-full items-center gap-2">
					<PromptInput
						conversationId={conversationId}
						disabled={createMessage.isPending}
						onSubmit={onSubmit}
					/>
				</div>
			</div>
		</main>
	);
};
