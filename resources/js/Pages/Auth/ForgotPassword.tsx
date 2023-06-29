import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function ForgotPassword({ status }: { status?: string }) {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.email"));
	};

	return (
		<GuestLayout title="Olvidé mi Contraseña">
			<Head title="Contraseña Olvidada" />

			<div className="mb-4 text-sm text-gray-600">
				¿Olvidaste tu contraseña? Danos tu correo electrónico y te
				enviaremos un enlace para que puedas establecer una nueva
				contraseña
			</div>

			{status && (
				<div className="mb-4 font-medium text-sm text-green-600">
					{status}
				</div>
			)}

			<form className="space-y-6" onSubmit={submit}>
				<TextField
					id="email"
					labelProps={{
						children: "Email",
					}}
					inputProps={{
						name: "email",
						type: "email",
						value: data.email,
						autoFocus: true,
						onChange: (e) => setData("email", e.target.value),
					}}
					errorMessage={errors.email}
				/>

				<div className="flex items-center justify-end mt-4">
					<Button>Enviar enlace</Button>
				</div>
			</form>
		</GuestLayout>
	);
}
