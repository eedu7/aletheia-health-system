"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api/auth";
import { getUserProfile } from "@/lib/api/user";

export function useAuth() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["auth", "user"],
		queryFn: async () => {
			try {
				return await getUserProfile();
			} catch {
				return null;
			}
		},
	});

	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: registerUser,
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
			router.push(process.env.NEXT_PUBLIC_AFTER_SIGN_UP_URL! || "/");
		},
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: loginUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
			router.push(process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL! || "/");
		},
	});

	const signOut = useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => {
			return null;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
			router.push(process.env.NEXT_PUBLIC_AFTER_SIGN_OUT_URL! || "/");
		},
	});

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		isError,
		signIn: signIn.mutateAsync,
		signUp: signUp.mutateAsync,
		signOut: signOut.mutateAsync,
	};
}
