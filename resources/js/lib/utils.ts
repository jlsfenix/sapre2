import type { UserRole, UserWithRoles } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get all the permissions included in each role
 *
 * @param roles The roles the user have
 * @returns An array of permission names
 */
function getPermissionsFromRoles(roles: UserRole[]): string[] {
	const permissions: string[] = [];

	// Create array of permissions within each role
	roles.forEach((role) => {
		role.permissions.forEach((permission) => {
			// Include permission name if not already included
			if (!permissions.includes(permission.name)) {
				permissions.push(permission.name);
			}
		});
	});

	return permissions;
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
	const permissions = getPermissionsFromRoles(user.roles);

	return permissions.includes(permission);
}

/**
 * Checks if user has any of the given permissions
 *
 * @param user User with roles and permissions
 * @param permissions The permissions that the user can have
 *
 * @returns **TRUE** if the user has any of the permissions, **FALSE** otherwise
 */
export function canDoAny(user: UserWithRoles, permissions: string[]): boolean {
	const rolePermissions = getPermissionsFromRoles(user.roles);

	return rolePermissions.some((permission) =>
		permissions.includes(permission)
	);
}
