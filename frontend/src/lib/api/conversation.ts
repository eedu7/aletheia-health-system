import api from "@/lib/api/index";
import { CreateConversation, CreateConversationResponse, GetUserConversationsResponse } from "@/lib/types/conversation";

// TODO: Proper Types and error handling
export async function getUserConversations(): Promise<GetUserConversationsResponse> {
	const res = await api.get<GetUserConversationsResponse>("/v1/conversations/user/");
	return res.data;
}

export async function createUserConversation(data: CreateConversation): Promise<CreateConversationResponse> {
	const res = await api.post<CreateConversationResponse>("/v1/conversations/", data);
	return res.data;
}
