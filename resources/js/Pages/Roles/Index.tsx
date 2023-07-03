import type { PageProps, Role } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Head } from "@inertiajs/react";
import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTableRowActions } from "./Partials/DataTableRowActions";

type DisplayRole = Pick<Role, "id" | "name">;

const columns: ColumnDef<DisplayRole>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
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
				/>
			}
		>
			<Head title="Roles" />

			<DataTable columns={columns} data={roles} />
		</AuthenticatedLayout>
	);
}
