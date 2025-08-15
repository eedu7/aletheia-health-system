import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { SignUpFormSchema } from "@/app/auth/schemas";
import { registerUser } from "@/lib/api/auth";

export function useAuth() {
	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: z.infer<typeof SignUpFormSchema>) => registerUser(data),
	});

	const signIn = () => {};

	return {
		signIn,
		signUp,
	};
}
