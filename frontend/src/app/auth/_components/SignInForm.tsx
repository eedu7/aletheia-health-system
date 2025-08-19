"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInputField } from "@/app/auth/_components/PasswordInputField";
import { SignInFormSchema } from "@/app/auth/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthApi } from "@/hooks/api/useAuthApi";

export const SignInForm = () => {
	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
	});

	const { signIn } = useAuthApi();
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const onSubmit = (data: z.infer<typeof SignInFormSchema>) => {
		signIn.mutate(data, {
			onSuccess: () => {
				router.push(process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL!);
			},
		});
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.ctrlKey && event.key === "Enter") {
			event.preventDefault();
			form.handleSubmit(onSubmit)();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Email" {...field} type="email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<PasswordInputField
									isVisible={isPasswordVisible}
									onToggleVisibility={togglePasswordVisibility}
									placeholder="Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" disabled={signIn.isPending}>
					{signIn.isPending ? (
						<span className="loading loading-spinner loading-sm flex items-center gap-2">
							<Loader2 /> Signing...
						</span>
					) : (
						<span>Sign In</span>
					)}
				</Button>
				<div className="w-full text-center">
					<p className="text-muted-foreground text-xs">
						New User?{" "}
						<Link
							href="/auth/sign-up"
							prefetch={false}
							className="hover:text-primary font-bold hover:underline"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
};
