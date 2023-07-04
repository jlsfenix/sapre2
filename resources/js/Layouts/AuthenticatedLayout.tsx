import type { PropsWithChildren, ReactNode } from "react";
import type { UserWithRoles } from "@/types";
import NavBar from "./Partials/NavBar";

export default function AuthenticatedLayout({
	user,
	header,
	children,
}: PropsWithChildren<{ user: UserWithRoles; header?: ReactNode }>) {
	return (
		<div className="min-h-screen bg-white">
			<NavBar user={user} />

			{header && (
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{header}
				</div>
			)}

			<main className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}
