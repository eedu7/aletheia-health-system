"use client";

import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/hooks/api/useConversation";
import { useMessage } from "@/hooks/api/useMessage";
import { Message } from "@/lib/types/message";
import { cn } from "@/lib/utils";

interface ConversationsPageViewProps {
	conversationId?: string;
}

export const ConversationsPageView = ({ conversationId }: ConversationsPageViewProps) => {
	const [prompt, setPrompt] = useState("");
	const [currentConversation, setCurrentConversation] = useState<string>(conversationId ?? "");
	const [messages, setMessages] = useState<Message[]>([]);

	const router = useRouter();

	const { createConversation } = useConversation();
	const { createMessage } = useMessage();

	const submit = async () => {
		if (!prompt || prompt === "") return;

		if (!conversationId) {
			const newConversation = await createConversation.mutateAsync({ title: prompt });
			const newId = newConversation.id;
			setCurrentConversation(newId);
			router.replace(`/conversations/${newId}`);
		}

		const userMessage = {
			id: crypto.randomUUID(),
			content: prompt,
			sender: "user",
			conversationId: currentConversation,
		};

		setMessages((prevMessages) => [...prevMessages, userMessage]);
		const aiResponse = await createMessage.mutateAsync({
			conversationId: currentConversation,
			content: prompt,
		});
		setMessages((prevMessages) => [...prevMessages, aiResponse]);
		setPrompt("");
	};

	return (
		<div className="border-purple overfow-y-hidden flex h-full w-full flex-col justify-center p-4">
			{messages.length > 0 && (
				<ScrollArea>
					<div className="h-full w-full flex-1 space-y-4">
						{messages.map(({ id, sender, content }) => (
							<div
								key={id}
								className={cn(sender == "user" ? "flex-row-reverse" : "flex-row", "flex gap-2")}
							>
								<div className="rounded bg-zinc-100 p-2">{content}</div>
							</div>
						))}
					</div>
					<Scrollbar orientation="vertical" />
				</ScrollArea>
			)}
			<form className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
				<Input
					placeholder="How was the day?"
					value={prompt}
					disabled={createConversation.isPending || createMessage.isPending}
					onChange={(e) => setPrompt(e.target.value)}
					className="w-[288px] md:w-[384px] lg:w-[512px] xl:w-[768px]"
				/>
				<Button
					disabled={createConversation.isPending || createMessage.isPending}
					className="w-fit cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					{createConversation.isPending || createMessage.isPending ? (
						<span className="flex w-full items-center justify-center gap-2">
							<Loader2 className="repeat-infinite animate-spin" />
						</span>
					) : (
						<span>Prompt</span>
					)}
				</Button>
			</form>
		</div>
	);
};
