import type { PropsWithChildren, ReactNode } from "react";
import type { User } from "@/types";
import NavBar from "./Partials/NavBar";

export default function AuthenticatedLayout({
	user,
	header,
	children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
	return (
		<div className="min-h-screen bg-white">
			<NavBar user={user} />

			{header && (
				<header className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{header}
				</header>
			)}

			<main className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}
