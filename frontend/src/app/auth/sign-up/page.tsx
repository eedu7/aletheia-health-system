import { Metadata } from "next";
import React from "react";
import { AuthCardFooter } from "@/app/auth/_components/AuthCardFooter";
import { SignUpForm } from "@/app/auth/sign-up/_components/SignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Sign Up - Aletheia Health",
	description: "Sign Up",
	keywords: ["sign up", "register"],
};

export default function SignUpPage() {
	return (
		<Card className="max-w-[400px] min-w-[300px]">
			<CardHeader>
				<CardTitle>Made for problem solvers</CardTitle>
				<CardDescription>Keep thinking, solving, and bettering with Aletheia Health</CardDescription>
			</CardHeader>
			<CardContent>
				<SignUpForm />
			</CardContent>
			<AuthCardFooter />
		</Card>
	);
}
