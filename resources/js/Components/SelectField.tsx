import type { SelectProps } from "@radix-ui/react-select";

import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import InputError from "./InputError";
import { cn } from "@/lib/utils";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "id"
	>;
	selectProps: Omit<SelectProps, "children">;
	options: {
		value: string;
		label: string;
	}[];
	placeholder?: string;
	errorMessage?: string;
	className?: string;
}

export default function SelectField({
	id,
	labelProps,
	selectProps,
	errorMessage,
	className,
	placeholder,
	options,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<Label htmlFor={id} {...labelProps} />

			<Select {...selectProps}>
				<SelectTrigger>
					<SelectValue
						placeholder={placeholder ?? "Seleccione una opción"}
					/>
				</SelectTrigger>

				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<InputError message={errorMessage} />
		</div>
	);
}
