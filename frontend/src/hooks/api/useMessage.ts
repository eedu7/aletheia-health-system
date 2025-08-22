import { useMutation } from "@tanstack/react-query";
import { createUserMessage } from "@/lib/api/message";

export function useMessage() {
	const createMessage = useMutation({
		mutationKey: ["message", "createMessage"],
		mutationFn: createUserMessage,
	});
	return {
		createMessage,
	};
}
