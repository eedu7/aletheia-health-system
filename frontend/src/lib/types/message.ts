export type Message = {
	id?: string;
	sender: string;
	content: string;
	conversationId: string;
};

export type CreateMessage = Pick<Message, "conversationId" | "content">;
