<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller {
	/**
	 * Display listing of the resource
	 */
	public function index(): Response {
		return Inertia::render("Users/Index", [
			"users" => User::all(),
		]);
	}
}
