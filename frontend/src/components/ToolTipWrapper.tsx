import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolTipProps {
	title: string;
	children: React.ReactNode;
}

export const ToolTipWrapper = ({ title, children }: ToolTipProps) => {
	return (
		<Tooltip>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent>{title}</TooltipContent>
		</Tooltip>
	);
};
