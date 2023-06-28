import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/text-field";
import CheckboxField from "@/Components/checkbox-field";
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
		<GuestLayout>
			<Head title="Log in" />

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
							value: data.email,
							placeholder: "ej: 12345678",
							autoComplete: "current-password",
							onChange: (e) =>
								setData("password", e.target.value),
						}}
						errorMessage={errors.password}
					/>
				</div>

				<div className="flex items-center justify-between">
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
						<Link
							href={route("password.request")}
							className="underline text-sm text-slate-600 hover:text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							¿Olvidaste tu contraseña?
						</Link>
					)}
				</div>

				<Button className="w-full" disabled={processing}>
					Iniciar Sesión
				</Button>
			</form>
		</GuestLayout>
	);
}
