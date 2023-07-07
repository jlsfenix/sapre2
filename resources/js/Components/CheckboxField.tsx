import type { CheckboxProps } from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import InputError from "./InputError";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface Props {
	id: string;
	labelProps: ComponentPropsWithoutRef<"label">;
	buttonProps: CheckboxProps;
	errorMessage?: string;
	className?: string;
}

export default function CheckboxField({
	id,
	labelProps,
	buttonProps,
	errorMessage,
	className,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex flex-row gap-x-2 items-center">
				<Checkbox id={id} {...buttonProps} />

				<Label htmlFor={id} {...labelProps} />
			</div>

			<InputError message={errorMessage} />
		</div>
	);
}
