"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserApi } from "@/hooks/api/useUserApi";
import { cn } from "@/lib/utils";

export const StaticPageNavbar = () => {
	const { user } = useUserApi();
	const isAuthenticated = !!user;
	const { data } = user;
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{isAuthenticated ? (
					<NavigationMenuItem>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback className="text-xs">{data?.fullName}</AvatarFallback>
						</Avatar>
					</NavigationMenuItem>
				) : (
					<>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
								<Link href="/auth/sign-in">Sign In</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
								<Link href="/auth/sign-up">Sign Up</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
