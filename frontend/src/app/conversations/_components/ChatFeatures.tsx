import { CopyIcon, RefreshCcw, Share, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

/* TODO: Make these button working */

export const ChatFeatures = () => {
	return (
		<div className="flex flex-col items-end justify-center">
			<div>
				<Button variant="ghost" size="sm" disabled>
					<CopyIcon className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<ThumbsUp className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<ThumbsDown className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<Volume2 className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<Share className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<RefreshCcw className="h-4 w-4" />
				</Button>
			</div>
			{/*TODO: Add a warning message and a link to the mistakes page explaining how mistake can occurs */}
			<Link
				href="#"
				className="text-xs font-medium text-gray-400 transition-colors duration-300 hover:text-gray-800"
			>
				Aletheia can make mistakes. Please double-check responses.
			</Link>
		</div>
	);
};
