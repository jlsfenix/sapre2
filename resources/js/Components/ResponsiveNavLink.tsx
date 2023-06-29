import { cn } from "@/lib/utils";
import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function ResponsiveNavLink({
	active = false,
	className = "",
	children,
	...props
}: InertiaLinkProps & { active?: boolean }) {
	return (
		<Link
			{...props}
			className={cn(
				"w-full flex items-start pl-3 pr-4 py-2 border-l-4",
				active
					? "border-slate-400 text-slate-700 bg-slate-50 focus:text-slate-800 focus:bg-slate-100 focus:border-slate-700"
					: "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 focus:text-slate-800 focus:bg-slate-50 focus:border-slate-300",
				"text-base font-medium focus:outline-none transition duration-150 ease-in-out",
				className
			)}
		>
			{children}
		</Link>
	);
}
