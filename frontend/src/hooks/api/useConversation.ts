"use client";

import { QueryClient } from "@tanstack/query-core";
import { useQuery } from "@tanstack/react-query";
import { getUserConversations } from "@/lib/api/conversation";

export function useConversation() {
	const queryClient = new QueryClient();

	const userConversations = useQuery({
		queryKey: ["conversations", "userConversations"],
		queryFn: getUserConversations,
	});

	// const userConversationInfiniteScroll = useInfiniteQuery({});

	return {
		userConversations,
	};
}
