import api from "@/lib/api/index";
import { Conversation } from "@/lib/types/conversation";

type GetUserConversationsResponse = {
	items: Conversation[];
	total: number;
	page: number;
	size: number;
};

// TODO: Proper Types and error handling
export async function getUserConversations(): Promise<GetUserConversationsResponse> {
	const res = await api.get("/v1/conversations/user/");
	return res.data;
}

type CreateConversationResponse = {
	id: string;
	title: string;
};

export async function createUserConversation(title: string): Promise<CreateConversationResponse> {
	const res = await api.post("/v1/conversations/", { title });
	return res.data;
}
