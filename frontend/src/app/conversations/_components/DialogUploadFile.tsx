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

export const DialogUploadFile = () => {
	return (
		<Dialog>
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
					<FileUpload />
				</div>
			</DialogContent>
		</Dialog>
	);
};
