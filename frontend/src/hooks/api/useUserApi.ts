import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api/user";

export function useUserApi() {
	const user = useQuery({
		queryKey: ["userProfile"],
		queryFn: getUserProfile,
	});
	return {
		user,
	};
}
