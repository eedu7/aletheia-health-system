import { z } from "zod";
import { SignUpFormSchema } from "@/app/auth/schemas";
import api from "@/lib/api/index";

type RegisterResponse = {
	id: string; // uuid
	fullName: string;
	email: string;
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
