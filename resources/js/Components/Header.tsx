import type { ReactNode } from "react";

export default function Header({
	title,
	actions,
}: {
	title: string;
	actions?: ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
			<h2 className="font-semibold text-2xl text-slate-800 leading-tight">
				{title}
			</h2>

			{actions ? actions : null}
		</header>
	);
}
