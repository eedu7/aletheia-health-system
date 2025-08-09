import { Merriweather, Open_Sans } from "next/font/google";
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// TODO: Properly use these fonts with tailwind
const merriWeather = Merriweather({
	variable: "--font-merri-weather",
	weight: ["700"],
});

const openSans = Open_Sans({
	variable: "--font-open-sans",
	weight: ["400"],
});

export const AuthCardHeader = () => {
	return (
		<CardHeader>
			<CardTitle className={cn("text-4xl font-bold", merriWeather.className)}>
				Built for Clarity. Driven by Care.
			</CardTitle>
			<CardDescription className={openSans.className}>
				Access Aletheia Health AI — your trusted partner in diagnosis, learning, and improvement.
			</CardDescription>
		</CardHeader>
	);
};
