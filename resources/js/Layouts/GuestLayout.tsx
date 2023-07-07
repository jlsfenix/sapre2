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
		<div className="flex min-h-screen flex-col items-center justify-center gap-y-6 bg-primary-foreground p-6">
			<div>
				<Link href="/">
					<ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
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
