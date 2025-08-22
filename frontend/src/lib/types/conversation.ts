import { Message } from "@/lib/types/message";

export type Conversation = {
	id: string;
	title: string;
	user_id: string;
	messages: Message[];
};
