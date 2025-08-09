import React from "react";
import { SocialLogin } from "@/app/auth/_components/SocialLogin";
import { CardFooter } from "@/components/ui/card";

// TODO: Add proper link to privacy policy and terms of service
export const AuthCardFooter = () => {
	return (
		<CardFooter className="flex flex-col gap-4">
			<SocialLogin />
			<small className="text-muted-foreground text-xs">
				By continuing, you acknowledge Aletheia Health&apos;s Privacy Policy and Terms of Service.
			</small>
		</CardFooter>
	);
};
