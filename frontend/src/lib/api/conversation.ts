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
