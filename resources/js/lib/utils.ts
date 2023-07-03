import type { UserWithRoles } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Checks if user has a permission
 *
 * @param user User with roles and permissions
 * @param permission The permission that the user needs to have
 *
 * @returns **TRUE** if the user has the permission, **FALSE** otherwise
 */
export function can(user: UserWithRoles, permission: string): boolean {
	if (!user.roles.length) return false;

	const permissions: string[] = [];

	// Create array of permissions within each role
	user.roles.forEach((role) => {
		role.permissions.forEach((permission) => {
			// Include permission name if not already included
			if (!permissions.includes(permission.name)) {
				permissions.push(permission.name);
			}
		});
	});

	return permissions.includes(permission);
}
