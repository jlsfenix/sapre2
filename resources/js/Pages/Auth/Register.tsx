import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	useEffect(() => {
		return () => {
			reset("password", "password_confirmation");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("register"));
	};

	return (
		<GuestLayout title="Registro">
			<Head title="Registro" />

			<form className="space-y-6" onSubmit={submit}>
				<div className="space-y-4">
					<TextField
						id="name"
						labelProps={{ children: "Nombre" }}
						inputProps={{
							name: "name",
							value: data.name,
							autoComplete: "name",
							autoFocus: true,
							placeholder: "ej: John Doe",
							onChange: (e) => setData("name", e.target.value),
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
							autoComplete: "username",
							placeholder: "ej: johndoe@gmail.com",
							onChange: (e) => setData("email", e.target.value),
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
							autoComplete: "new-password",
							placeholder: "ej: 12345678",
							onChange: (e) =>
								setData("password", e.target.value),
							required: true,
						}}
						errorMessage={errors.password}
					/>

					<TextField
						id="password_confirmation"
						labelProps={{ children: "Confirmar Contraseña" }}
						inputProps={{
							type: "password",
							name: "password_confirmation",
							value: data.password_confirmation,
							placeholder: "ej: 12345678",
							autoComplete: "new-password",
							onChange: (e) =>
								setData(
									"password_confirmation",
									e.target.value
								),
							required: true,
						}}
						errorMessage={errors.password_confirmation}
					/>
				</div>

				<div className="mt-4 flex items-center justify-end">
					<Button asChild variant="link">
						<Link href={route("login")}>¿Ya estas registrado?</Link>
					</Button>

					<Button disabled={processing}>Registrar</Button>
				</div>
			</form>
		</GuestLayout>
	);
}
