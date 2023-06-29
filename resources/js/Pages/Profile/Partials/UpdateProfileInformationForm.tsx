import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function UpdateProfileInformation({
	mustVerifyEmail,
	status,
	className = "",
}: {
	mustVerifyEmail: boolean;
	status?: string;
	className?: string;
}) {
	const user = usePage<PageProps>().props.auth.user;

	const { data, setData, patch, errors, processing, recentlySuccessful } =
		useForm({
			name: user.name,
			email: user.email,
		});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		patch(route("profile.update"));
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Información</CardTitle>

				<CardDescription>
					Actualiza la información de tu perfil y el correo
					electrónico
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form className="space-y-6" onSubmit={submit}>
					<div className="space-y-4">
						<TextField
							id="name"
							labelProps={{
								children: "Nombre",
							}}
							inputProps={{
								name: "name",
								autoFocus: true,
								value: data.name,
								onChange: (e) =>
									setData("name", e.target.value),
								required: true,
								autoComplete: "name",
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
								onChange: (e) =>
									setData("email", e.target.value),
								required: true,
								autoComplete: "username",
							}}
							errorMessage={errors.email}
						/>
					</div>

					{mustVerifyEmail && user.email_verified_at === null && (
						<div className="space-y-2">
							<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
								<p className="text-slate-800 text-sm">
									Tu correo electrónico no está verificado
								</p>

								<Button variant="ghost" asChild>
									<Link
										href={route("verification.send")}
										method="post"
										as="button"
									>
										Reenviar correo de verificación.
									</Link>
								</Button>
							</div>

							{status === "verification-link-sent" && (
								<div className="font-medium text-sm text-green-600">
									Un nuevo enlace de verificación ha sido
									enviado a tu correo electrónico.
								</div>
							)}
						</div>
					)}

					<div className="flex items-center gap-4">
						<Button disabled={processing}>Guardar</Button>

						<Transition
							show={recentlySuccessful}
							enterFrom="opacity-0"
							leaveTo="opacity-0"
							className="transition ease-in-out"
						>
							<p className="text-sm text-slate-600">Gurdado.</p>
						</Transition>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
