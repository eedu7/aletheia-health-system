import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api/user";

export function useUserApi() {
	const user = useQuery({
		queryKey: ["user"],
		queryFn: getUserProfile,
	});
	return {
		user,
	};
}
