import Link from "next/link";
import React from "react";
import { SocialLogin } from "@/app/auth/_components/SocialLogin";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// TODO: Add proper link to privacy policy and terms of service
export const AuthCardFooter = () => {
	return (
		<CardFooter className="flex flex-col gap-4">
			<SocialLogin />
			<Separator />

			<p className="text-muted-foreground text-center text-xs">
				By continuing, you acknowledge Aletheia Health&apos;s{" "}
				<Link href="#" prefetch={false} className="hover:text-primary font-bold hover:underline">
					Privacy Policy
				</Link>{" "}
				and{" "}
				<Link href="#" prefetch={false} className="hover:text-primary font-bold hover:underline">
					Terms of Service.
				</Link>
			</p>
		</CardFooter>
	);
};
