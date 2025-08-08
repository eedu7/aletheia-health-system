import Image from "next/image";
import React from "react";
import AuthResearchImage from "../../../public/images/auth-research-page.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col p-2">
			<main className="grid flex-1 grid-cols-1 lg:grid-cols-2">
				<div className="flex flex-col items-center justify-center">{children}</div>
				<div className="hidden place-items-center lg:grid">
					<Image
						src={AuthResearchImage}
						alt="Auth Research Image"
						className="h-[512px] w-[512px] rounded-4xl"
					/>
				</div>
			</main>
		</div>
	);
}
