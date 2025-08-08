import React from "react";
import { CardFooter } from "@/components/ui/card";

// TODO: Add proper link to privacy policy and terms of service
export const AuthCardFooter = () => {
	return (
		<CardFooter>
			<small className="text-muted-foreground text-sm">
				By continuing, you acknowledge Aletheia Health&apos;s Privacy Policy and Terms of Service.
			</small>
		</CardFooter>
	);
};
