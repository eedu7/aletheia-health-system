import React from "react";
import { ConversationsSidebar } from "@/app/conversations/_components/ConversationsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ConversationsLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider defaultOpen={false}>
			<ConversationsSidebar />
			<main className="w-full">{children}</main>
		</SidebarProvider>
	);
}
