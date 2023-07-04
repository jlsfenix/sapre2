<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
		return "hola mundo";
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
		$role->getAllPermissions();

		return Inertia::render("Roles/Role", [
			"role" => $role,
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Role $role) {
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

		return Inertia::render("Roles/Edit", [
			"role" => $role,
			"globalPermissions" => $globalPermissions,
			"rolePermissions" => $mergePermissions,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Role $role) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Role $role) {
		//
	}
}
