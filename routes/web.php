<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
	return Inertia::render("Welcome", [
		"canLogin" => Route::has("login"),
		"canRegister" => Route::has("register"),
		"laravelVersion" => Application::VERSION,
		"phpVersion" => PHP_VERSION,
	]);
});

Route::get("/dashboard", function () {
	return Inertia::render("Dashboard");
})
	->middleware(["auth", "verified"])
	->name("dashboard");

Route::middleware("auth")->group(function () {
	Route::get("/profile", [ProfileController::class, "edit"])->name(
		"profile.edit"
	);
	Route::patch("/profile", [ProfileController::class, "update"])->name(
		"profile.update"
	);
	Route::delete("/profile", [ProfileController::class, "destroy"])->name(
		"profile.destroy"
	);
});

Route::middleware("auth")->group(function () {
	Route::resource("users", UserController::class)
		->only(["create", "store"])
		->middleware("can:create users");

	Route::get("/users", [UserController::class, "index"])
		->name("users.index")
		->middleware(["can:view users"]);

	Route::resource("users", UserController::class)
		->only(["edit", "update"])
		->middleware("can:edit users");

	Route::resource("users", UserController::class)
		->only(["destroy"])
		->middleware("can:delete users");
});

Route::middleware("auth")->group(function () {
	Route::resource("roles", RoleController::class)
		->only(["create", "store"])
		->middleware("can:create roles");

	Route::resource("roles", RoleController::class)
		->only(["index", "show"])
		->middleware("can:view roles");

	Route::resource("roles", RoleController::class)
		->only(["edit", "update"])
		->middleware("can:edit roles");

	Route::resource("roles", RoleController::class)
		->only(["destroy"])
		->middleware("can:delete roles");
});

require __DIR__ . "/auth.php";
