import CheckboxField from "@/Components/CheckboxField";
import Header from "@/Components/Header";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Create({
	auth,
	permissions,
	rolePermissions,
}: PageProps<{
	permissions: string[];
	rolePermissions: { [key: string]: boolean };
}>) {
	// Form controls
	const { data, setData, post, processing, errors, clearErrors, transform } =
		useForm<{
			name: string;
			[key: string]: boolean | string;
		}>({
			name: "",
			...rolePermissions,
		});

	// Submits the new role
	const submit: FormEventHandler = (event) => {
		event.preventDefault();

		post(route("roles.store"));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Crear rol"
					description="Agrega un nuevo rol y asigna los permisos asociados."
				/>
			}
		>
			<Head title="Crear rol" />

			<Card>
				<CardContent className="p-6">
					<form onSubmit={submit} className="space-y-6">
						<div className="space-y-4">
							<TextField
								id="name"
								labelProps={{ children: "Nombre" }}
								inputProps={{
									name: "name",
									placeholder: "ej: admin",
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
									{permissions.map((permission) => (
										<li key={permission}>
											<CheckboxField
												id={permission}
												labelProps={{
													children: permission,
												}}
												buttonProps={{
													name: permission,
													checked: Boolean(
														data[permission]
													),
													onCheckedChange: (e) => {
														setData(
															permission,
															Boolean(e.valueOf())
														);
													},
												}}
												errorMessage={
													errors[permission]
												}
											/>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="flex justify-end gap-4">
							<Button variant="ghost" asChild>
								<Link href={route("roles.index")}>
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
