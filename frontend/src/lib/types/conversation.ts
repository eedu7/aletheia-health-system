import { Message } from "@/lib/types/message";

export type Conversation = {
	id: string;
	title: string;
	user_id: string;
	messages: Message[];
};

export type GetUserConversationsResponse = {
	items: Conversation[];
	total: number;
	page: number;
	size: number;
};

export type CreateConversation = Pick<Conversation, "title">;
export type CreateConversationResponse = Pick<Conversation, "id" | "title">;
export type ConversationIDResponse = {
	id: string;
	title: string;
	messages: Omit<Message, "conversationId">[];
};
