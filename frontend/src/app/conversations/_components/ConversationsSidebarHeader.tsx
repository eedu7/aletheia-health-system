import { PanelLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
	toggleSidebar: () => void;
}

export const ConversationsSidebarHeader = ({ open, toggleSidebar }: ConversationsSidebarHeaderProps) => {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className={"flex flex-row items-center justify-between"}>
					<AnimatePresence>
						{open && (
							<SidebarMenuItem>
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.2 }}
								>
									<SidebarMenuButton className="cursor-pointer">
										<span>Aletheia Ai</span>
									</SidebarMenuButton>
								</motion.div>
							</SidebarMenuItem>
						)}
					</AnimatePresence>

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
