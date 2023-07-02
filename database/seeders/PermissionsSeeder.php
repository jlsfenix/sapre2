<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		// Reset cached roles and permissions
		app()[
			\Spatie\Permission\PermissionRegistrar::class
		]->forgetCachedPermissions();

		$permissionsNames = [
			// Users
			"create users",
			"view users",
			"edit users",
			"delete users",

			// Roles
			"create roles",
			"view roles",
			"edit roles",
			"delete roles",

			// Loans
			"request loans",
			"view loans",
			"view own loans",
			"edit loans",
			"approve or decline loans",
			"download contracts",
			"download own contracts",
			"delete loans",

			// Payments
			"create payments",
			"view payments",
			"view own payments",
			"edit payments",
			"approve or decline payments",
			"delete payments",
		];

		$permissions = collect($permissionsNames)->map(function ($permission) {
			return ["name" => $permission, "guard_name" => "web"];
		});

		// Create permissions
		Permission::insert($permissions->toArray());

		// Assign permissions to each role
		Role::create(["name" => "admin"])->givePermissionTo(
			// Users
			"create users",
			"view users",
			"edit users",
			"delete users",

			// Roles
			"create roles",
			"view roles",
			"edit roles",
			"delete roles",

			// Loans
			"view loans",
			"edit loans",
			"approve or decline loans",
			"download contracts",
			"delete loans",

			// Payments
			"view payments",
			"edit payments",
			"approve or decline payments",
			"delete payments"
		);

		Role::create(["name" => "employee"])->givePermissionTo([
			// Users
			"create users",
			"view users",

			// Loans
			"view loans",
			"approve or decline loans",
			"download contracts",

			// Payments
			"view payments",
			"approve or decline payments",
		]);

		Role::create(["name" => "client"])->givePermissionTo([
			// Loans
			"request loans",
			"view own loans",
			"download own contracts",

			// Payments
			"create payments",
			"view own payments",
		]);
	}
}
