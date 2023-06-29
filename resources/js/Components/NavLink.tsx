import { cn } from "@/lib/utils";
import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
	active = false,
	className = "",
	children,
	...props
}: InertiaLinkProps & { active: boolean }) {
	return (
		<Link
			{...props}
			className={cn(
				"text-sm font-medium transition-colors",
				active
					? "text-slate-700"
					: "text-slate-500 hover:text-gray-700",
				className
			)}
		>
			{children}
		</Link>
	);
}
