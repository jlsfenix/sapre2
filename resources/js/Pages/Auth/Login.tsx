import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import CheckboxField from "@/Components/CheckboxField";
import { Button } from "@/Components/ui/button";

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("login"));
	};

	return (
		<GuestLayout title="Inicio de Sesión">
			<Head title="Inicio de Sesión" />

			{status && (
				<div className="mb-4 font-medium text-sm text-green-600">
					{status}
				</div>
			)}

			<form className="space-y-6" onSubmit={submit}>
				<div className="space-y-4">
					<TextField
						id="email"
						labelProps={{
							children: "Email",
						}}
						inputProps={{
							type: "email",
							name: "email",
							value: data.email,
							placeholder: "ej: johndoe@gmail.com",
							autoComplete: "username",
							autoFocus: true,
							onChange: (e) => setData("email", e.target.value),
							required: true,
						}}
						errorMessage={errors.email}
					/>

					<TextField
						id="password"
						labelProps={{
							children: "Contraseña",
						}}
						inputProps={{
							type: "password",
							name: "password",
							value: data.password,
							placeholder: "ej: 12345678",
							autoComplete: "current-password",
							onChange: (e) =>
								setData("password", e.target.value),
							required: true,
						}}
						errorMessage={errors.password}
					/>
				</div>

				<div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
					<CheckboxField
						id="remember"
						labelProps={{
							children: "Recuérdame",
						}}
						buttonProps={{
							name: "remember",
							checked: data.remember,
							onCheckedChange: (e) => {
								setData("remember", Boolean(e.valueOf()));
							},
						}}
					/>

					{canResetPassword && (
						<Button asChild className="w-fit" variant="link">
							<Link href={route("password.request")}>
								¿Olvidaste tu contraseña?
							</Link>
						</Button>
					)}
				</div>

				<Button className="w-full" disabled={processing}>
					Iniciar Sesión
				</Button>
			</form>
		</GuestLayout>
	);
}
