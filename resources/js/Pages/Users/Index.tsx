import type { PageProps, User } from "@/types";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { DataTable } from "@/Components/DataTable";

const columnHelper = createColumnHelper<User>();

const columns = [
	columnHelper.accessor("name", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: (info) => <div>{info.getValue()}</div>,
		enableSorting: true,
		enableHiding: false,
	}),
	columnHelper.accessor("email", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: (info) => <div>{info.getValue()}</div>,
		enableSorting: true,
		enableHiding: false,
	}),
];

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Usuarios"
					description="Administra los usuarios registrados en el sistema."
				/>
			}
		>
			<Head title="Usuarios" />

			<DataTable data={users} columns={columns} />
		</AuthenticatedLayout>
	);
}
