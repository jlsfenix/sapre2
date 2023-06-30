import type { ReactNode } from "react";

export default function Header({
	title,
	actions,
}: {
	title: string;
	actions?: ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<h2 className="text-2xl font-semibold leading-tight text-slate-800">
				{title}
			</h2>

			{actions ? actions : null}
		</header>
	);
}
