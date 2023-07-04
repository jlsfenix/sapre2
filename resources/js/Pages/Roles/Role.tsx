import type { PageProps, Permission, Role } from "@/types";

import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Check } from "lucide-react";
import { can } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

export default function Role({
	auth,
	role,
}: PageProps<{ role: Role & { permissions: Permission[] } }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Rol"
					description="Observa la información del rol seleccionado."
					actions={
						can(auth.user, "edit roles") ? (
							<Button asChild>
								<Link href={route("roles.edit", role)}>
									Editar
								</Link>
							</Button>
						) : null
					}
				/>
			}
		>
			<Head title="Rol" />

			<div className="space-y-6">
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">Nombre</h2>

					<p className="text-muted-foreground">{role.name}</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">Permisos</h2>

					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{role.permissions?.map((permission) => (
							<li
								key={permission.id}
								className="flex items-center"
							>
								<Check className="mr-2 h-4 w-4" />

								{permission.name}
							</li>
						))}
					</ul>
				</section>
			</div>
		</AuthenticatedLayout>
	);
}
