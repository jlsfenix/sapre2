import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { can, canDoAny } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const {
		props: { auth },
	} = usePage<PageProps>();

	const userId: number = row.getValue("id");

	// In case user can't do any of the actions
	if (
		!canDoAny(auth.user, ["edit users", "delete users"]) ||
		auth.user.id === userId
	) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Abrir menú</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-[160px]">
				{can(auth.user, "edit users") ? (
					<DropdownMenuItem asChild>
						<Link href={route("users.edit", userId)}>
							<Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Editar
						</Link>
					</DropdownMenuItem>
				) : null}

				{can(auth.user, "delete users") ? (
					<>
						<DropdownMenuSeparator />

						<DropdownMenuItem asChild>
							<Link
								className="w-full"
								as="button"
								href={route("users.destroy", userId)}
								method="delete"
							>
								<Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
								Eliminar
							</Link>
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
