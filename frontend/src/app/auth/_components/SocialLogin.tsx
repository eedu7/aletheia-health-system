import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import React from "react";
import { Button } from "@/components/ui/button";

export const SocialLogin = () => {
	return (
		<div className="my-2 flex flex-wrap gap-2">
			<Button
				className="flex-1 cursor-pointer"
				variant="outline"
				aria-label="Login with Google"
				size="lg"
				disabled
			>
				<RiGoogleFill className="dark:text-primary text-[#DB4437]" size={16} aria-hidden="true" />
			</Button>
			<Button
				className="flex-1 cursor-pointer"
				variant="outline"
				aria-label="Login with Facebook"
				size="lg"
				disabled
			>
				<RiFacebookFill className="dark:text-primary text-[#1877f2]" size={16} aria-hidden="true" />
			</Button>
			<Button className="flex-1 cursor-pointer" variant="outline" aria-label="Login with X" size="lg" disabled>
				<RiTwitterXFill className="dark:text-primary text-[#14171a]" size={16} aria-hidden="true" />
			</Button>
			<Button
				className="flex-1 cursor-pointer"
				variant="outline"
				aria-label="Login with GitHub"
				size="lg"
				disabled
			>
				<RiGithubFill className="dark:text-primary text-black" size={16} aria-hidden="true" />
			</Button>
		</div>
	);
};
