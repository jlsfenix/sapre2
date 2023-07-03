export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
}

export interface Role {
	id: number;
	name: string;
	guard_name: string;
	created_at: string;
	updated_at: string;
	permissions?: Permission[];
}

export interface Permission extends Omit<Role, "created_at" | "updated_at"> {
	pivot: {
		role_id: number;
		permission_id: number;
	};
	created_at: null;
	updated_at: null;
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>
> = T & {
	auth: {
		user: User;
	};
};
