"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInputField } from "@/app/auth/_components/PasswordInputField";
import { SignUpFormSchema } from "@/app/auth/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthApi } from "@/hooks/api/useAuthApi";

export const SignUpForm = () => {
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onSubmit",
	});

	const { signUp } = useAuthApi();
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
		signUp.mutate(data, {
			onSuccess: () => {
				router.push("/");
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
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Full Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
									{...field}
									placeholder="Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									type={isPasswordVisible ? "text" : "password"}
									placeholder="Confirm Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" disabled={signUp.isPending}>
					{signUp.isPending ? (
						<span className="loading loading-spinner loading-sm flex items-center gap-2">
							<Loader2 /> Signing...
						</span>
					) : (
						<span>Sign Up</span>
					)}
				</Button>
				<div className="w-full text-center">
					<p className="text-muted-foreground text-xs">
						Already have an account?{" "}
						<Link
							href="/auth/sign-in"
							prefetch={false}
							className="hover:text-primary font-bold hover:underline"
						>
							Sign In
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
};
