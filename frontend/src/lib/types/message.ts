export type Message = {
	id: string;
	sender: string;
	content: string;
};

export type CreateMessage = {
	conversationId: string;
	senderType: string;
	content: string;
};
