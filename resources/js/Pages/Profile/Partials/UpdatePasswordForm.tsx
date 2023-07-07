import { useRef, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function UpdatePasswordForm({
	className = "",
}: {
	className?: string;
}) {
	const {
		data,
		setData,
		errors,
		put,
		reset,
		processing,
		recentlySuccessful,
	} = useForm({
		current_password: "",
		password: "",
		password_confirmation: "",
	});

	const updatePassword: FormEventHandler = (e) => {
		e.preventDefault();

		put(route("password.update"), {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Actualizar Contraseña</CardTitle>

				<CardDescription>
					Asegurate que tu cuenta utilice una contraseña larga y
					aleatoria para mantenerte seguro.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={updatePassword} className="space-y-6">
					<div className="space-y-4">
						<TextField
							id="current_password"
							labelProps={{ children: "Contraseña Actual" }}
							inputProps={{
								name: "current_password",
								value: data.current_password,
								onChange: (e) =>
									setData("current_password", e.target.value),
								type: "password",
								autoComplete: "current-password",
							}}
							errorMessage={errors.current_password}
						/>

						<TextField
							id="password"
							labelProps={{ children: "Nueva Contraseña" }}
							inputProps={{
								name: "password",
								type: "password",
								value: data.password,
								onChange: (e) =>
									setData("password", e.target.value),
								autoComplete: "new-password",
							}}
							errorMessage={errors.password}
						/>

						<TextField
							id="password_confirmation"
							labelProps={{ children: "Confirme la Contraseña" }}
							inputProps={{
								name: "password_confirmation",
								type: "password",
								value: data.password_confirmation,
								onChange: (e) =>
									setData(
										"password_confirmation",
										e.target.value
									),
								autoComplete: "new-password",
							}}
							errorMessage={errors.password_confirmation}
						/>
					</div>

					<div className="flex items-center gap-4">
						<Button disabled={processing}>Guardar</Button>

						<Transition
							show={recentlySuccessful}
							enterFrom="opacity-0"
							leaveTo="opacity-0"
							className="transition ease-in-out"
						>
							<p className="text-sm text-slate-600">Guardado.</p>
						</Transition>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
