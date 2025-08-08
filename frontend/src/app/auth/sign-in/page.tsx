import { Metadata } from "next";
import React from "react";
import { AuthCardFooter } from "@/app/auth/_components/AuthCardFooter";
import { AuthCardHeader } from "@/app/auth/_components/AuthCardHeader";
import { SignInForm } from "@/app/auth/sign-in/_components/SignInForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Sign In - Aletheia Health",
	description: "Sign In",
	keywords: ["sign in", "login"],
};

export default function SignInPage() {
	return (
		<Card className="max-w-[400px] min-w-[300px]">
			<AuthCardHeader />
			<CardContent>
				<SignInForm />
			</CardContent>
			<AuthCardFooter />
		</Card>
	);
}
