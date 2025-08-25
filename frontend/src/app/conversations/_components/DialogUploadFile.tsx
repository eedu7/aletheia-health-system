"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ClickSafeButton } from "./ClickSafeButton";

export const DialogUploadFile = ({ conversationId }: { conversationId: string }) => {
	const [open, setOpen] = useState(false);

	const toggleDialog = () => {
		setOpen((prev) => !prev);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<ClickSafeButton variant="ghost" type="button" className="">
					Upload File
				</ClickSafeButton>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload a file</DialogTitle>
					<DialogDescription>Choose a file to upload from your device.</DialogDescription>
				</DialogHeader>
				<div>
					<FileUpload toggleDialog={toggleDialog} conversationId={conversationId} />
				</div>
			</DialogContent>
		</Dialog>
	);
};
