import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { SignInFormSchema, SignUpFormSchema } from "@/app/auth/schemas";
import { loginUser, registerUser } from "@/lib/api/auth";

export function useAuth() {
	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: z.infer<typeof SignUpFormSchema>) => registerUser(data),
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: z.infer<typeof SignInFormSchema>) => loginUser(data),
	});

	return {
		signIn,
		signUp,
	};
}
