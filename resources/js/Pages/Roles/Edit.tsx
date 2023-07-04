import CheckboxField from "@/Components/CheckboxField";
import Header from "@/Components/Header";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Role } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
	auth,
	role,
	globalPermissions,
	rolePermissions,
}: PageProps<{
	role: Role;
	globalPermissions: string[];
	rolePermissions: { [key: string]: boolean };
}>) {
	const { data, setData, post, processing, errors, reset } = useForm<{
		name: string;
		[key: string]: boolean | string;
	}>({
		name: role.name,
		...rolePermissions,
	});

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<Header
					title="Editar rol"
					description="Actualiza la informacion del rol seleccionado."
				/>
			}
		>
			<Head title="Editar rol" />

			<Card>
				<CardContent className="p-6">
					<form className="space-y-6">
						<div className="space-y-4">
							<TextField
								id="name"
								labelProps={{ children: "Nombre" }}
								inputProps={{
									name: "name",
									value: data.name,
									placeholder: "ej: admin",
									onChange: (e) =>
										setData("name", e.target.value),
									required: true,
								}}
							/>

							<div className="space-y-4">
								<Label asChild>
									<p>Permisos</p>
								</Label>

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
												/>
											</li>
										)
									)}
								</ul>
							</div>
						</div>

						<div className="flex justify-end gap-4">
							<Button variant="ghost" asChild>
								<Link href="/roles">Cancelar</Link>
							</Button>

							<Button>Actualizar rol</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AuthenticatedLayout>
	);
}
