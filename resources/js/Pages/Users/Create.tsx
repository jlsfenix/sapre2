import type { FormEventHandler } from "react";
import type { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Header from "@/Components/Header";
import SelectField from "@/Components/SelectField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

export default function Create({
	auth,
	roles,
}: PageProps<{ roles: string[] }>) {
	// Form controls
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	// Submits the new user
	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("users.store"));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Crear usuario"
					description="Agrega un nuevo usuario y asigna su rol dentro del sistema."
				/>
			}
		>
			<Head title="Crear usuario" />

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

							<TextField
								id="password"
								labelProps={{ children: "Contraseña" }}
								inputProps={{
									type: "password",
									name: "password",
									value: data.password,
									placeholder: "ej: 12345678",
									onChange: (e) =>
										setData("password", e.target.value),
									required: true,
								}}
								errorMessage={errors.password}
							/>

							<SelectField
								id="role"
								labelProps={{ children: "Rol" }}
								placeholder="Seleccione un rol"
								selectProps={{
									name: "role",
									required: true,
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

							<Button disabled={processing}>Crear</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AuthenticatedLayout>
	);
}
