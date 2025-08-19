import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolTipProps {
	title: string;
	shortcut?: string;
	visible: boolean;
	children: React.ReactNode;
}

export const ToolTipWrapper = ({ title, children, shortcut, visible }: ToolTipProps) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			{visible && (
				<TooltipContent side="right" className="flex items-center justify-between gap-2 text-sm">
					<p>{title}</p>
					<p className="text-slate-400">{shortcut}</p>
				</TooltipContent>
			)}
		</Tooltip>
	);
};
