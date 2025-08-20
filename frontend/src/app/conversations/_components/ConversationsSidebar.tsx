"use client";

import { Edit, Search } from "lucide-react";
import React from "react";
import { ConversationSidebarFooterNavUser } from "@/app/conversations/_components/ConversationSidebarFooterNavUser";
import { ConversationsSidebarHeader } from "@/app/conversations/_components/ConversationsSidebarHeader";
import { ToolTipWrapper } from "@/components/ToolTipWrapper";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export const ConversationsSidebar = () => {
	const { open, toggleSidebar } = useSidebar();
	return (
		<Sidebar collapsible="icon">
			<SidebarContent className="overflow-x-hidden">
				<ConversationsSidebarHeader open={open} toggleSidebar={toggleSidebar} />
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<ToolTipWrapper title="New conversation" shortcut="Ctrl + Shift + O" visible={!open}>
								<SidebarMenuItem>
									<SidebarMenuButton className="cursor-pointer">
										<Edit />
										<span>New conversation</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</ToolTipWrapper>
							<ToolTipWrapper title="Search conversations" shortcut="Ctrl + K" visible={!open}>
								<SidebarMenuItem>
									<SidebarMenuButton className="cursor-pointer">
										<Search />
										<span>Search conversations</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</ToolTipWrapper>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<ConversationSidebarFooterNavUser
					user={{ name: "@shadcn", email: "m@example.com", avatar: "https://github.com/shadcn.png" }}
				/>
			</SidebarFooter>
		</Sidebar>
	);
};
