"use client";

import { QueryClient } from "@tanstack/query-core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserConversation, getUserConversations } from "@/lib/api/conversation";

export function useConversation() {
	const queryClient = new QueryClient();

	const userConversations = useQuery({
		queryKey: ["conversations", "userConversations"],
		queryFn: getUserConversations,
	});

	const createConversation = useMutation({
		mutationKey: ["conversations", "createConversation"],
		mutationFn: createUserConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["conversations", "userConversations"] });
		},
	});

	return {
		userConversations,
		createConversation,
	};
}
