"use client";

import { Edit, Search } from "lucide-react";
import React from "react";
import { ConversationsSidebarHeader } from "@/app/conversations/_components/ConversationsSidebarHeader";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export const ConversationsSidebar = () => {
	const { open } = useSidebar();
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<ConversationsSidebarHeader open={open} />
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton className="cursor-pointer">
									<Edit />
									<span>New conversation</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton className="cursor-pointer">
									<Search />
									<span>Search conversations</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
