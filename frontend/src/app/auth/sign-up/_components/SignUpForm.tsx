"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

export const SignUpFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.email(),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpForm = () => {
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "all",
	});

	const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
		console.table(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}></form>
		</Form>
	);
};
