<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use Hash;

class UserController extends Controller {
	/**
	 * Display listing of the resource
	 */
	public function index(): Response {
		return Inertia::render("Users/Index", [
			"users" => User::all(),
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
		$role = Role::all()->pluck("name");

		$validate = $request->validate([
			"name" => "required|max:255",
			"email" => "required|unique:users",
			"password" => "required",
			"role" => "required|exists:roles,name",
		]);

		//creación del usuario
		$user = User::create([
			"name" => $validate["name"],
			"email" => Hash::make($validate["email"]),
			"password" => $validate["password"],
		]);

		//asignación de los permisos
		$user->roles()->sync($validate["role"]);

		$user->save();

		//dd($validate);
		return redirect(route("users.index"))->with(
			"Suscess",
			"sussesfully created"
		);
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(User $role) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $role) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, User $user) {
		$request->validate([
			"name" => "required|max:255",
			"email" => "required|unique:users",
			"password" => "required",
			"role" => "required|exists:roles,name",
		]);

		$user->name = $request->name;
		$user->email = $request->email;
		$user->password = Hash::make($request->password);
		$user->syncRoles($request->role);

		$user->save();

		return redirect(route("users.index"));
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user) {
		$user->delete();

		return redirect(route("users.index"));
		//
	}
}
