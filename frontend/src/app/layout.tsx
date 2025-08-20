import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { TanstackReactQueryProvider } from "@/providers/TanstackReactQueryProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Aletheia Health - Smarter Care with AI",
	description:
		"Aletheia Health uses AI to support patients and doctors with early cancer detection, secure health records, and personalized medical insights — because every life matters.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<TanstackReactQueryProvider>{children}</TanstackReactQueryProvider>
			</body>
		</html>
	);
}
