import type { UserWithRoles } from "@/types";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import UserNav from "@/Components/UserNav";
import { Button } from "@/Components/ui/button";
import { can, cn } from "@/lib/utils";

const links: {
	title: string;
	href: string;
	permission?: string;
}[] = [
	{
		title: "Dashboard",
		href: "dashboard",
	},
	{
		title: "Usuarios",
		href: "users.index",
		permission: "view users",
	},
	{
		title: "Roles",
		href: "roles.index",
		permission: "view roles",
	},
];

function MobileMenu({
	className,
	user,
	...props
}: React.ComponentPropsWithoutRef<"nav"> & { user: UserWithRoles }) {
	return (
		<nav className={cn("flex flex-col gap-4", className)} {...props}>
			<ul className="flex-col gap-4">
				{links.map(({ title, href, permission }) => {
					if (permission && !can(user, permission)) return null;

					return (
						<li key={href} className="">
							<ResponsiveNavLink
								href={route(href)}
								active={route().current(href)}
							>
								{title}
							</ResponsiveNavLink>
						</li>
					);
				})}
			</ul>

			<div className="border-t border-gray-200 py-4">
				<div className="px-4">
					<div className="text-base font-medium text-gray-800">
						{user.name}
					</div>

					<div className="text-sm font-medium text-gray-500">
						{user.email}
					</div>
				</div>

				<div className="mt-3 space-y-1">
					<ResponsiveNavLink href={route("profile.edit")}>
						Perfil
					</ResponsiveNavLink>

					<ResponsiveNavLink
						method="post"
						href={route("logout")}
						as="button"
					>
						Cerrar Sesión
					</ResponsiveNavLink>
				</div>
			</div>
		</nav>
	);
}

export default function NavBar({
	className,
	user,
	...props
}: React.ComponentPropsWithoutRef<"nav"> & { user: UserWithRoles }) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false);

	return (
		<nav className={cn("border-b bg-white", className)} {...props}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex gap-6">
						<div className="flex shrink-0 items-center">
							<Link href="/">
								<ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
							</Link>
						</div>

						<div className="hidden sm:flex">
							<ul className="flex items-center">
								{links.map(({ title, href, permission }) => {
									if (permission && !can(user, permission)) {
										return null;
									}

									return (
										<li className="block" key={href}>
											<NavLink
												className="px-2 py-4"
												href={route(href)}
												active={route().current(href)}
											>
												{title}
											</NavLink>
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<div className="relative ml-3">
							<UserNav user={user} />
						</div>
					</div>

					<div className="flex items-center sm:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								setShowingNavigationDropdown(
									(previousState) => !previousState
								)
							}
						>
							{showingNavigationDropdown ? (
								<X className="h-4 w-4" />
							) : (
								<Menu className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>
			</div>

			<div
				className={cn(
					showingNavigationDropdown ? "block" : "hidden",
					"sm:hidden"
				)}
			>
				<MobileMenu user={user} />
			</div>
		</nav>
	);
}
