import type { PageProps, User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { DataTableRowActions } from "./Partials/DataTableRowActions";
import { can } from "@/lib/utils";
import { Badge } from "@/Components/ui/badge";
import { DataTableToolbar } from "./Partials/DataTableToolbar";

type UserDisplay = User & {
	roles: {
		name: string;
		pivot: {
			model_id: number;
			role_id: number;
			model_type: string;
		};
	}[];
};

// The columns to display
const columns: ColumnDef<UserDisplay>[] = [
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
		accessorKey: "roles",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Roles" />
		),
		cell: ({ row }) => {
			const roles = row.getValue("roles") as UserDisplay["roles"];

			return (
				<div className="flex gap-2">
					{roles.map((role) => {
						return (
							<Badge key={role.name} variant="outline">
								{role.name}
							</Badge>
						);
					})}
				</div>
			);
		},
		enableSorting: false,
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
	users,
}: PageProps<{ users: UserDisplay[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Usuarios"
					description="Administra los usuarios registrados en el sistema."
					actions={
						can(auth.user, "create users") ? (
							<Button asChild>
								<Link href={route("users.create")}>
									Crear usuario
								</Link>
							</Button>
						) : null
					}
				/>
			}
		>
			<Head title="Usuarios" />

			<DataTable
				data={users}
				columns={columns}
				Toolbar={DataTableToolbar}
			/>
		</AuthenticatedLayout>
	);
}
