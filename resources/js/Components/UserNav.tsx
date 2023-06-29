import type { User as UserType } from "@/types";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function UserNav({ user }: { user: UserType }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					{user.name}

					<ChevronDown className="ml-2" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={route("profile.edit")}>
							<User className="mr-2 h-4 w-4" />

							<span>Perfil</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem asChild>
						<Link href={route("profile.edit")}>
							<LogOut className="mr-2 h-4 w-4" />

							<span>Cerrar Sesión</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
