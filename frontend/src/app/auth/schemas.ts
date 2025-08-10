import { z } from "zod";

export const SignUpFormSchema = z
	.object({
		fullName: z
			.string()
			.min(1, "Full name is required")
			.regex(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces"),
		email: z.email("Invalid email address"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/\d/, "Password must contain at least one number")
			.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const SignInFormSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});
