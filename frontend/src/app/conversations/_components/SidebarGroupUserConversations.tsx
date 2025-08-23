"use client";

import { Scrollbar } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { cn } from "@/lib/utils";

export const SidebarGroupUserConversations = () => {
	const { open } = useSidebar();
	const { userAllConversations } = useConversation();
	const { data, isLoading, isError } = userAllConversations;
	const pathName = usePathname();

	const currentId = pathName.split("/").pop();
	const isActive = (id: string): boolean => {
		return currentId ? currentId === id : false;
	};

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
		<SidebarGroup className="overflow-y-hidden">
			<SidebarGroupLabel>Conversations</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<ScrollArea className="h-[768px]">
						{data.items.map(({ id, title }) => (
							<SidebarMenuItem key={id}>
								<SidebarMenuButton
									asChild
									isActive={isActive(id)}
									className={cn(!isActive(id) && "text-gray-700")}
								>
									<Link
										prefetch={false}
										href={`/conversations/${id}`}
										className="animate-slide-in flex w-full items-center justify-start gap-2 opacity-0"
									>
										{title}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
						<Scrollbar orientation="vertical" />
					</ScrollArea>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
