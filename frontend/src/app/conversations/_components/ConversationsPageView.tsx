"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversation } from "@/hooks/api/useConversation";

interface ConversationsPageViewProps {
	conversationId?: string;
}

export const ConversationsPageView = ({ conversationId }: ConversationsPageViewProps) => {
	const [prompt, setPrompt] = useState("");
	const [currentConversation, setCurrentConversation] = useState<string>(conversationId ?? "");

	const router = useRouter();

	const { createConversation } = useConversation();

	const submit = async () => {
		if (!conversationId) {
			const newConversation = await createConversation.mutateAsync({ title: prompt });
			if (createConversation.status == "success") {
				setCurrentConversation(newConversation.id);
				router.replace(`/conversations/${newConversation.id}`);
			}
		}

		alert("Conversation created successfully.");
	};

	return (
		<div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
			<Input
				placeholder="How was the day?"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="w-[288px] md:w-[384px] lg:w-[512px] xl:w-[768px]"
			/>
			<Button disabled={createConversation.isPending} className="w-fit cursor-pointer" onClick={() => submit()}>
				{createConversation.isPending ? (
					<span className="flex w-full items-center justify-center gap-2">
						<Loader2 className="repeat-infinite animate-spin" />
					</span>
				) : (
					<span>Prompt</span>
				)}
			</Button>
		</div>
	);
};
