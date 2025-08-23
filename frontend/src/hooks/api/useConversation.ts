"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserConversation, getAllUserConversations, getConversationById } from "@/lib/api/conversation";

interface useConversationProps {
	conversationId?: string;
}

export function useConversation(props?: useConversationProps) {
	const conversationId = props?.conversationId;
	const queryClient = useQueryClient();

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
