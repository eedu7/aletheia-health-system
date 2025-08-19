"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { SignInFormSchema, SignUpFormSchema } from "@/app/auth/schemas";
import { loginUser, registerUser } from "@/lib/api/auth";

export function useAuthApi() {
	const queryClient = useQueryClient();
	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: z.infer<typeof SignUpFormSchema>) => registerUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userProfile"] });
		},
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: z.infer<typeof SignInFormSchema>) => loginUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userProfile"] });
		},
	});

	return {
		signIn,
		signUp,
	};
}
