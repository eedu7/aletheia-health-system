import api from "@/lib/api/index";
import { ConversationIDResponse, CreateConversation, CreateConversationResponse, GetUserConversationsResponse } from "@/lib/types/conversation";


// TODO: Proper Types and error handling
export async function getAllUserConversations(): Promise<GetUserConversationsResponse> {
	const res = await api.get<GetUserConversationsResponse>("/v1/conversations/user/?limit=50");
	return res.data;
}

export async function createUserConversation(data: CreateConversation): Promise<CreateConversationResponse> {
	const res = await api.post<CreateConversationResponse>("/v1/conversations/", data);
	return res.data;
}

export async function getConversationById(id: string): Promise<ConversationIDResponse> {
	const res = await api.get<ConversationIDResponse>(`/v1/conversations/${id}`);
	return res.data;
}
