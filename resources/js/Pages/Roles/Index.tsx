import type { PageProps, Role } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Head, Link } from "@inertiajs/react";
import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTableRowActions } from "./Partials/DataTableRowActions";
import { Button } from "@/Components/ui/button";
import { can } from "@/lib/utils";

type DisplayRole = Pick<Role, "id" | "name">;

const columns: ColumnDef<DisplayRole>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "",
		cell: ({ row }) => (
			<div className="flex justify-end">
				<DataTableRowActions row={row} />
			</div>
		),
	},
];

export default function Index({
	auth,
	roles,
}: PageProps<{ roles: DisplayRole[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Roles"
					description="Administra los roles y sus permisos asignados en el sistema."
					actions={
						can(auth.user, "create roles") ? (
							<Button asChild>
								<Link href={route("roles.create")}>
									Crear rol
								</Link>
							</Button>
						) : null
					}
				/>
			}
		>
			<Head title="Roles" />

			<DataTable columns={columns} data={roles} />
		</AuthenticatedLayout>
	);
}
