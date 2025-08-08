import { Metadata } from "next";
import React from "react";
import { AuthCardFooter } from "@/app/auth/_components/AuthCardFooter";
import { AuthCardHeader } from "@/app/auth/_components/AuthCardHeader";
import { SignUpForm } from "@/app/auth/sign-up/_components/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Sign Up - Aletheia Health",
	description: "Sign Up",
	keywords: ["sign up", "register"],
};

export default function SignUpPage() {
	return (
		<Card className="max-w-[400px] min-w-[300px]">
			<AuthCardHeader />
			<CardContent>
				<SignUpForm />
			</CardContent>
			<AuthCardFooter />
		</Card>
	);
}
