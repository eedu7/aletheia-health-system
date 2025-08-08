import Image from "next/image";
import React from "react";
import AuthResearchImage from "../../../public/images/auth-research-page.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 grid grid-cols-2">
				<div className="flex flex-col justify-center items-center">{children}</div>
				<div className="grid place-items-center">
					<Image
						src={AuthResearchImage}
						alt="Auth Research Image"
						width={512}
						height={512}
						className="rounded-4xl"
					/>
				</div>
			</main>
		</div>
	);
}
