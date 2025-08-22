import api from "@/lib/api/index";
import { CreateMessage } from "@/lib/types/message";

export async function createUserMessage({ conversationId, content }: CreateMessage) {
	const res = await api.post("/v1/messages/", {
		conversation_id: conversationId,
		content: content,
	});
	return res.data;
}
