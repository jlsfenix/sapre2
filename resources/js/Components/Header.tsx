import type { ReactNode } from "react";

export default function Header({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">{title}</h2>

				{description ? (
					<p className="text-muted-foreground">{description}</p>
				) : null}
			</div>

			<div className="w-fit">{actions ? actions : null}</div>
		</header>
	);
}
