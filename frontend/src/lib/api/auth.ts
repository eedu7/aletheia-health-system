import { z } from "zod";
import { SignInFormSchema, SignUpFormSchema } from "@/app/auth/schemas";
import api from "@/lib/api/index";

type RegisterResponse = {
	id: string; // uuid
	fullName: string;
	email: string;
};

type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

export async function registerUser(data: z.infer<typeof SignUpFormSchema>) {
	const payload = {
		full_name: data.fullName,
		email: data.email,
		password: data.password,
	};

	const res = await api.post<RegisterResponse>("/v1/auth/register", payload);
	return res.data;
}

export async function loginUser(data: z.infer<typeof SignInFormSchema>) {
	const res = await api.post<LoginResponse>("/v1/auth/login", data);
	return res.data;
}
