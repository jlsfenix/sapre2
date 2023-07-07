<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
			"users" => User::with("roles:name")->get(),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$roles = Role::all()->pluck("name");

		return Inertia::render("Users/Create", [
			"roles" => $roles,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		$validate = $request->validate([
			"name" => "required|max:255",
			"email" => "required|email|unique:users",
			"password" => "required|min:8|max:255",
			"role" => "required|exists:roles,name",
		]);

		// Create the user and assign its role
		$user = User::create([
			"name" => $validate["name"],
			"email" => $validate["email"],
			"password" => Hash::make($validate["password"]),
		]);

		$user->assignRole($validate["role"]);

		return redirect(route("users.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(User $user) {
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user) {
		// Get all the roles and user roles
		$roles = Role::all()->pluck("name");

		$userRoles = $user
			->roles()
			->get()
			->pluck("name");

		return Inertia::render("Users/Edit", [
			"user" => $user,
			"userRole" => $userRoles[0],
			"roles" => $roles,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, User $user) {
		$request->validate([
			"name" => "required|max:255",
			"email" => [
				"required",
				"email",
				Rule::unique("users")->ignore($user->id),
			],
			"role" => "required|exists:roles,name",
		]);

		// Update user info and its role
		$user->update([
			"name" => $request["name"],
			"email" => $request["email"],
		]);

		$user->syncRoles($request["role"]);

		return redirect(route("users.index"));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user) {
		// Avoid user own deletion
		if ($user->id !== Auth::id()) {
			$user->delete();
		}

		return redirect(route("users.index"));
	}
}
