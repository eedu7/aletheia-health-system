import api from "@/lib/api/index";

type UserProfile = {
	id: string;
	fullName: string;
	email: string;
};

export async function getUserProfile() {
	const res = await api.get<UserProfile>("/v1/user");
	return res.data;
}
