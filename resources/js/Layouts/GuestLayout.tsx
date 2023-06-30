import ApplicationLogo from "@/Components/ApplicationLogo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

export default function GuestLayout({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode | ReactNode[];
}) {
	return (
		<div className="min-h-screen flex flex-col gap-y-6 justify-center items-center p-6 bg-gray-100">
			<div>
				<Link href="/">
					<ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
				</Link>
			</div>

			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>{title}</CardTitle>

					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</CardHeader>

				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
