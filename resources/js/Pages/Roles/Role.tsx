import type { PageProps, Permission, Role } from "@/types";

import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Check } from "lucide-react";

export default function Role({
	auth,
	role,
}: PageProps<{ role: Role & { permissions: Permission[] } }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title={`Rol: ${role.name}`}
					description="Observa los permisos del rol seleccionado."
				/>
			}
		>
			<Head title="Rol" />

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{role.permissions?.map((permission) => (
					<li key={permission.id} className="flex items-center">
						<Check className="mr-2 h-4 w-4" />

						{permission.name}
					</li>
				))}
			</ul>
		</AuthenticatedLayout>
	);
}
