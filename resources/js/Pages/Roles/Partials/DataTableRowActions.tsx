import { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pen, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
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
				<DropdownMenuItem asChild>
					<Link href={route("roles.show", row.getValue("id"))}>
						<Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Ver permisos
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Editar
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Eliminar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
