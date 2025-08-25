"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "@/lib/api/document";

export function useDocument(conversationId: string) {
	const upload = useMutation({
		mutationKey: ["uploadDocument", conversationId],
		mutationFn: async (files: File[]) => await uploadDocument(conversationId, files),
	});

	return { upload };
}
