"use client";

import { PanelLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { ToolTipWrapper } from "@/components/ToolTipWrapper";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export const ConversationsSidebarHeader = () => {
	const { open, toggleSidebar } = useSidebar();

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className={"flex flex-row items-center justify-between"}>
					<AnimatePresence>
						{open && (
							<SidebarMenuItem>
								<motion.div
									initial={{ opacity: 0, x: -10, y: -10 }}
									animate={{ opacity: 1, x: 0, y: 0 }}
									exit={{ opacity: 0, x: -10, y: -10 }}
									transition={{ duration: 0.175 }}
								>
									<SidebarMenuButton className="cursor-pointer">
										<span>Aletheia Ai</span>
									</SidebarMenuButton>
								</motion.div>
							</SidebarMenuItem>
						)}
					</AnimatePresence>
					<ToolTipWrapper title={open ? "Close sidebar" : "Open sidebar"} visible={true}>
						<SidebarMenuItem>
							<SidebarMenuButton onClick={toggleSidebar} className="cursor-ew-resize">
								<PanelLeftIcon />
							</SidebarMenuButton>
						</SidebarMenuItem>
					</ToolTipWrapper>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
