import { useState, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import TextField from "@/Components/TextField";

export default function DeleteUserForm({
	className = "",
}: {
	className?: string;
}) {
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

	const {
		data,
		setData,
		delete: destroy,
		processing,
		reset,
		errors,
	} = useForm({
		password: "",
	});

	const deleteUser: FormEventHandler = (e) => {
		e.preventDefault();

		destroy(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => closeModal(),
			onFinish: () => reset(),
		});
	};

	const closeModal = () => {
		setConfirmingUserDeletion(false);

		reset();
	};

	const onOpenChange = (open: boolean) => {
		open ? setConfirmingUserDeletion(true) : closeModal();
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Eliminar Cuenta</CardTitle>

				<CardDescription>
					Una vez tu cuenta este eliminada, todos los recursos y datos
					asociados serán eliminados de forma permanente.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Dialog
					open={confirmingUserDeletion}
					onOpenChange={onOpenChange}
				>
					<DialogTrigger asChild>
						<Button variant="destructive">Eliminar Cuenta</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>
								¿Estás seguro de eliminar tu cuenta?
							</DialogTitle>

							<DialogDescription>
								Una vez tu cuenta este eliminada, todos los
								recursos y datos asociados serán eliminados de
								forma permanente.
							</DialogDescription>
						</DialogHeader>

						<form className="space-y-6" onSubmit={deleteUser}>
							<TextField
								id="passowrd"
								labelProps={{ children: "Contraseña" }}
								inputProps={{
									name: "password",
									type: "password",
									value: data.password,
									onChange: (e) =>
										setData("password", e.target.value),
									autoFocus: true,
									required: true,
								}}
								errorMessage={errors.password}
							/>

							<Button variant="destructive" disabled={processing}>
								Eliminar
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
