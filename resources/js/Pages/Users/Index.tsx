import type { PageProps, User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { DataTableRowActions } from "./Partials/DataTableRowActions";
import { can } from "@/lib/utils";

// The columns to display
const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => row.getValue("email"),
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

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Usuarios"
					description="Administra los usuarios registrados en el sistema."
					actions={
						can(auth.user, "create users") ? (
							<Button>Crear usuario</Button>
						) : null
					}
				/>
			}
		>
			<Head title="Usuarios" />

			<DataTable data={users} columns={columns} />
		</AuthenticatedLayout>
	);
}
