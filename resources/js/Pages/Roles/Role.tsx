import type { PageProps, Role } from "@/types";

import { FormEventHandler, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Header from "@/Components/Header";
import TextField from "@/Components/TextField";
import CheckboxField from "@/Components/CheckboxField";
import { can } from "@/lib/utils";

export default function Role({
	auth,
	role,
	globalPermissions,
	rolePermissions,
}: PageProps<{
	role: Role;
	globalPermissions: string[];
	rolePermissions: { [key: string]: boolean };
}>) {
	const { url } = usePage();
	const editingDefaultValue = url.includes("edit=true") || false;
	const canEditRoles = can(auth.user, "edit roles");

	// Editing state
	const [editing, setEditing] = useState(
		canEditRoles ? editingDefaultValue : false
	);

	// Form controls
	const { data, setData, put, processing, errors, clearErrors, transform } =
		useForm<{
			name: string;
			[key: string]: boolean | string;
		}>({
			name: role.name,
			...rolePermissions,
		});

	// Submits the updated role
	const submit: FormEventHandler = (event) => {
		event.preventDefault();

		put(route("roles.update", role.id), {
			onSuccess: () => setEditing(false),
		});
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Rol"
					description="Observa la información del rol seleccionado."
					actions={
						can(auth.user, "edit roles") ? (
							<Button onClick={() => setEditing(true)}>
								Editar
							</Button>
						) : null
					}
				/>
			}
		>
			<Head title="Rol" />

			<Card>
				<CardContent className="p-6">
					<form onSubmit={submit} className="space-y-6">
						<div className="space-y-4">
							<TextField
								id="name"
								labelProps={{ children: "Nombre" }}
								inputProps={{
									disabled: !editing,
									name: "name",
									value: data.name,
									onChange: (e) =>
										setData("name", e.target.value),
									required: true,
								}}
								errorMessage={errors.name}
							/>

							<div className="space-y-4">
								<Label>Permisos</Label>

								<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
									{globalPermissions.map(
										(globalPermission) => (
											<li key={globalPermission}>
												<CheckboxField
													id={globalPermission}
													labelProps={{
														children:
															globalPermission,
													}}
													buttonProps={{
														disabled: !editing,
														name: globalPermission,
														checked: Boolean(
															data[
																globalPermission
															]
														),
														onCheckedChange: (
															e
														) => {
															setData(
																globalPermission,
																Boolean(
																	e.valueOf()
																)
															);
														},
													}}
													errorMessage={
														errors[globalPermission]
													}
												/>
											</li>
										)
									)}
								</ul>
							</div>
						</div>

						<div className="flex justify-end gap-4">
							{editing ? (
								<>
									<Button
										type="button"
										variant="ghost"
										onClick={() => {
											setEditing(false);

											clearErrors();
										}}
									>
										Cancelar
									</Button>

									<Button disabled={processing}>
										Actualizar
									</Button>
								</>
							) : (
								<Button variant="outline" asChild>
									<Link href="/roles">Volver</Link>
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</AuthenticatedLayout>
	);
}
