import { PanelLeftIcon } from "lucide-react";
import React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ConversationsSidebarHeaderProps {
	open: boolean;
	toggleSidebar: () => void;
}

export const ConversationsSidebarHeader = ({ open, toggleSidebar }: ConversationsSidebarHeaderProps) => {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className={cn("flex flex-row items-center justify-between", !open && "flex-col")}>
					{open && (
						<SidebarMenuItem>
							<SidebarMenuButton className="cursor-pointer">
								<span>Aletheia Ai</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)}

					<SidebarMenuItem>
						<SidebarMenuButton onClick={toggleSidebar} className="cursor-pointer">
							<PanelLeftIcon />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
