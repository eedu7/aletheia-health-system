import { PanelLeftIcon } from "lucide-react";
import React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

interface ConversationsSidebarHeaderProps {
	open: boolean;
}

export const ConversationsSidebarHeader = ({ open }: ConversationsSidebarHeaderProps) => {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className="flex flex-row items-center justify-between">
					{open && (
						<SidebarMenuItem>
							<SidebarMenuButton>
								<span>Aletheia Ai</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)}
					<SidebarMenuItem>
						<SidebarMenuButton>
							<PanelLeftIcon />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
