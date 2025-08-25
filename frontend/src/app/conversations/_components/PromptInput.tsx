"use client";

import { ArrowUp, Loader2, Plus, Settings2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { ClickSafeButton } from "@/app/conversations/_components/ClickSafeButton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DialogUploadFile } from "./DialogUploadFile";

interface PromptInputProps {
	onSubmit: (value: string) => void;
	disabled?: boolean;
	className?: string;
	conversationId?: string;
}

export const PromptInput = ({ onSubmit, className, disabled, conversationId }: PromptInputProps) => {
	const [message, setMessage] = useState("");
	const promptRef = useRef<HTMLTextAreaElement | null>(null);

	const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
		if (e) e.preventDefault();

		if (!message.trim()) return;
		onSubmit(message);
		setMessage("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form
			className={cn(
				"grid w-full max-w-4xl min-w-[280px] cursor-text rounded-xl border p-2 shadow md:min-w-xl lg:min-w-2xl",
				className,
			)}
			onClick={() => promptRef.current?.focus()}
			onSubmit={handleSubmit}
		>
			<Textarea
				ref={promptRef}
				className="w-full resize-none border-0 shadow-none ring-0 outline-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none"
				value={message}
				onKeyDown={handleKeyDown}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type your message..."
			/>
			<div className="flex items-center justify-between px-3">
				{/*TODO: Make these buttons work and do something*/}
				<div className="flex items-center gap-2">
					<ClickSafeButton type="button" size="icon" variant="ghost" className="cursor-pointer" disabled>
						<Plus />
					</ClickSafeButton>
					<ClickSafeButton type="button" size="icon" variant="ghost" className="cursor-pointer" disabled>
						<Settings2 />
					</ClickSafeButton>
					{conversationId && <DialogUploadFile conversationId={conversationId} />}
				</div>

				<ClickSafeButton
					type="submit"
					className="cursor-pointer"
					size="icon"
					aria-label="Send message"
					disabled={!message.trim() || disabled}
				>
					{disabled ? <Loader2 className="repeat-infinite animate-spin" /> : <ArrowUp />}
				</ClickSafeButton>
			</div>
		</form>
	);
};
