import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps, Role } from "@/types";
import { Head } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";

type DisplayRole = Pick<Role, "name">;

const columnHelper = createColumnHelper<DisplayRole>();

const columns = [
	columnHelper.accessor("name", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: (info) => <div>{info.getValue()}</div>,
		enableSorting: false,
		enableHiding: false,
	}),
];

export default function Index({
	auth,
	roles,
}: PageProps<{ roles: DisplayRole[] }>) {
	return (
		<AuthenticatedLayout user={auth.user} header={<Header title="Roles" />}>
			<Head title="Roles" />

			<DataTable columns={columns} data={roles} />
		</AuthenticatedLayout>
	);
}
