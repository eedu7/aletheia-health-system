"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser, registerUser } from "@/lib/api/auth";
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
			const afterSignUpUrl = process.env.NEXT_PUBLIC_AFTER_SIGN_UP_URL;

			if (afterSignUpUrl) {
				router.push(afterSignUpUrl);
			} else {
				router.push("/");
			}
		},
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: loginUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
			const afterSignInUrl = process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL;

			if (afterSignInUrl) {
				router.push(afterSignInUrl);
			} else {
				router.push("/");
			}
		},
	});

	const signOut = useMutation({
		mutationKey: ["logout"],
		mutationFn: logoutUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

			const afterSignOutUrl = process.env.NEXT_PUBLIC_AFTER_SIGN_OUT_URL;

			if (afterSignOutUrl) {
				router.push(afterSignOutUrl);
			} else {
				router.push("/");
			}
		},
	});

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		isError,
		signIn,
		signUp,
		signOut,
	};
}
