"use client";

import { ArrowUp, Plus, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const PromptInput = () => {
	const [message, setMessage] = useState("");

	return (
		<form className="grid w-full max-w-2xl rounded-xl border p-4 shadow">
			<Textarea
				className="w-full resize-none border-0 shadow-none ring-0 outline-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type your message..."
			/>
			<div className="flex items-center justify-between">
				{/*TODO: Make these buttons work and do something*/}
				<div className="space-x-2">
					<Button type="button" size="icon" variant="outline" className="cursor-pointer" disabled>
						<Plus />
					</Button>
					<Button type="button" size="icon" variant="outline" className="cursor-pointer" disabled>
						<Settings2 />
					</Button>
				</div>
				<Button type="submit" className="cursor-pointer" size="icon" aria-label="Send message" disabled>
					<ArrowUp />
				</Button>
			</div>
		</form>
	);
};
