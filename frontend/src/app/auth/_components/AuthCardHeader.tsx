import { Merriweather } from "next/font/google";
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const merriWeather = Merriweather({
	variable: "--font-merri-weather",
	weight: ["700"],
});

export const AuthCardHeader = () => {
	return (
		<CardHeader>
			<CardTitle className={merriWeather.className}>Built for Clarity. Driven by Care.</CardTitle>
			<CardDescription>
				Access Aletheia Health AI — your trusted partner in diagnosis, learning, and improvement.
			</CardDescription>
		</CardHeader>
	);
};
