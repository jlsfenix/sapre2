import type { PageProps, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Header from "@/Components/Header";
import { FormEventHandler } from "react";
import SelectField from "@/Components/SelectField";
import TextField from "@/Components/TextField";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function Edit({
	auth,
	user,
	userRole,
	roles,
}: PageProps<{ user: User; userRole: string; roles: string[] }>) {
	// Form controls
	const { data, setData, put, processing, errors } = useForm({
		name: user.name,
		email: user.email,
		role: userRole,
	});

	// Submits the updated user
	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		put(route("users.update", user.id));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Editar usuario"
					description="Actualiza la información o el rol del usuario seleccionado."
				/>
			}
		>
			<Head title="Editar usuario" />

			<Card>
				<CardContent className="p-6">
					<form className="space-y-6" onSubmit={submit}>
						<div className="space-y-4">
							<TextField
								id="name"
								labelProps={{ children: "Nombre" }}
								inputProps={{
									name: "name",
									value: data.name,
									autoFocus: true,
									placeholder: "ej: John Doe",
									onChange: (e) =>
										setData("name", e.target.value),
									required: true,
								}}
								errorMessage={errors.name}
							/>

							<TextField
								id="email"
								labelProps={{ children: "Email" }}
								inputProps={{
									type: "email",
									name: "email",
									value: data.email,
									placeholder: "ej: johndoe@gmail.com",
									onChange: (e) =>
										setData("email", e.target.value),
									required: true,
								}}
								errorMessage={errors.email}
							/>

							<SelectField
								id="role"
								labelProps={{ children: "Rol" }}
								placeholder="Seleccione un rol"
								selectProps={{
									name: "role",
									required: true,
									defaultValue: data.role,
									onValueChange: (value) =>
										setData("role", value),
								}}
								options={roles.map((role) => ({
									label: role,
									value: role,
								}))}
								errorMessage={errors.role}
							/>
						</div>

						<div className="flex justify-end gap-4">
							<Button variant="ghost" asChild>
								<Link href={route("users.index")}>
									Cancelar
								</Link>
							</Button>

							<Button disabled={processing}>Actualizar</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AuthenticatedLayout>
	);
}
