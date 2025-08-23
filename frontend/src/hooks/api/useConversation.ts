"use client";

import { QueryClient } from "@tanstack/query-core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserConversation, getAllUserConversations, getConversationById } from "@/lib/api/conversation";

interface useConversationProps {
	conversationId?: string;
}

export function useConversation({ conversationId }: useConversationProps) {
	const queryClient = new QueryClient();

	const userAllConversations = useQuery({
		queryKey: ["conversations", "userAllConversations"],
		queryFn: getAllUserConversations,
	});

	const conversationById = useQuery({
		queryKey: ["conversations", "conversationById"],
		queryFn: () => getConversationById(conversationId!),
		enabled: !!conversationId,
	});

	const createConversation = useMutation({
		mutationKey: ["conversations", "createConversation"],
		mutationFn: createUserConversation,
		onSuccess: () => {
			console.log("Invalidating the queries");
			queryClient.invalidateQueries({ queryKey: ["conversations", "userAllConversations"] });
		},
	});

	return {
		userAllConversations,
		conversationById,
		createConversation,
	};
}
