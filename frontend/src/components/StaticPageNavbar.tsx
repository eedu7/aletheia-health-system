"use client";

import Link from "next/link";
import React from "react";
import { StaticPageNavbarAvatar } from "@/components/StaticPageNavbarAvatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/api/useAuth";
import { cn } from "@/lib/utils";

export const StaticPageNavbar = () => {
	const { isAuthenticated, user } = useAuth();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{isAuthenticated && user ? (
					<StaticPageNavbarAvatar fullName={user.fullName} />
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
