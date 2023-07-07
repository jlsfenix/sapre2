<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		$user = new User([
			"email" => "admin@gmail.com",
			"password" => Hash::make("123"),
			"name" => "Admin",
		]);
		$user->saveOrFail();

		$user = new User([
			"email" => "employer@gmail.com",
			"password" => Hash::make("321"),
			"name" => "Employer",
		]);
		$user->saveOrFail();

		$user = new User([
			"email" => "client@gmail.com",
			"password" => Hash::make("331"),
			"name" => "Client+",
		]);
		$user->saveOrFail();

		// Assign each role to the first three users
		User::find(1)->assignRole("admin");
		User::find(2)->assignRole("employee");
		User::find(3)->assignRole("client");
	}
}
