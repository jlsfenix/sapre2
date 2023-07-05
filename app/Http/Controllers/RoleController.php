<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Str;

class RoleController extends Controller {
	/**
	 * Display listing of the resource
	 */
	public function index(): Response {
		return Inertia::render("Roles/Index", [
			"roles" => Role::all(["id", "name"]),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Role $role) {
		// Get all the permissions names
		$permissions = Permission::all(["id", "name"])->sortBy("id");
		$globalPermissions = $permissions->pluck("name")->toArray();

		// Get the permissions names from the role
		$role->getAllPermissions();

		$rolePermissions = $role
			->permissions()
			->pluck("name")
			->toArray();

		$mergePermissions = [];

		foreach ($globalPermissions as $index => $permissionsG) {
			$mergePermissions[$permissionsG] = in_array(
				$permissionsG,
				$rolePermissions
			);
		}

		return Inertia::render("Roles/Role", [
			"role" => $role,
			"globalPermissions" => $globalPermissions,
			"rolePermissions" => $mergePermissions,
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Role $role) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Role $role) {
		$permissions = Permission::all()->pluck("name");

		$rules = [
			"name" => [
				"required",
				"max:255",
				Rule::unique("roles")->ignore($role->id),
			],
		];

		// Add permission names to rules
		foreach ($permissions as $permission) {
			$rules[$permission] = "required|boolean";
		}

		$validated = $request->validate($rules);

		// Update name
		$role->update([
			"name" => $validated["name"],
		]);

		// Update role permissions
		foreach ($permissions as $permission) {
			if ($validated[$permission]) {
				$role->givePermissionTo($permission);
			} else {
				$role->revokePermissionTo($permission);
			}
		}

		return redirect(route("roles.show", $role));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Role $role) {
		$role->delete();

		return redirect(route("roles.index"));
	}
}
