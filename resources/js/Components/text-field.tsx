import { cn } from "@/lib/utils";
import InputError from "./input-error";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "id"
	>;
	inputProps: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "id"
	>;
	errorMessage?: string;
	className?: string;
}

export default function TextField({
	id,
	labelProps,
	inputProps,
	errorMessage,
	className,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<Label htmlFor={id} {...labelProps} />

			<Input
				id={id}
				aria-invalid={errorMessage ? true : false}
				{...inputProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
