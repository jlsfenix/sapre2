<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

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
		$role->getAllPermissions();
		return view(view:'roles.show', data: compact(var_name: 'role'));
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Role $role) {
		$permissions = Permission::all(["id", "name"]);
		$role->getAllPermissions();
		return view(view:'roles.edit', data: compact(var_name: 'role', var_names: 'permissions'));
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
