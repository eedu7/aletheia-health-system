"use client";

import React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useConversation } from "@/hooks/api/useConversation";

export const SidebarGroupUserConversations = () => {
	const { open } = useSidebar();
	const { userConversations } = useConversation();
	const { data, isLoading, isError } = userConversations;

	if (!open) return null;

	if (isLoading) {
		return (
			<SidebarGroup>
				<SidebarGroupLabel>Loading...</SidebarGroupLabel>
			</SidebarGroup>
		);
	}

	if (isError) {
		return (
			<SidebarGroup>
				<SidebarGroupLabel>Error loading conversations</SidebarGroupLabel>
			</SidebarGroup>
		);
	}

	if (!data || data.items.length === 0) {
		return (
			<SidebarGroup>
				<SidebarGroupLabel>No Conversations</SidebarGroupLabel>
			</SidebarGroup>
		);
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Conversations</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{data.items.map(({ id, title }) => (
						<SidebarMenuItem key={id}>
							<SidebarMenuButton>
								<span className="truncate">{title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
