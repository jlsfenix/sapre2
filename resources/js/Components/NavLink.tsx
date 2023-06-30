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
				"text-sm font-medium transition-colors hover:text-primary",
				active ? "" : "text-muted-foreground",
				className
			)}
		>
			{children}
		</Link>
	);
}
