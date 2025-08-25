import api from ".";

export async function uploadDocument(conversationId: string, files: File[]) {
	const formData = new FormData();

	files.forEach((file) => formData.append("files", file));
	formData.append("conversation_id", conversationId);

	const res = await api.post("/v1/document/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res.data;
}
