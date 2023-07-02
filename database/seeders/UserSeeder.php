<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\user;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //Se crean usuarios en base ded datos
        $contraseña = "123";
        $user = new User([
            "email" => "admin@gmail.com",
            "password" => Hash::make($contraseña),
            "name" => "Admin",
        ]);
        $user->saveOrFail();

        $contraseña = "321";
        $user = new User([
            "email" => "employer@gmail.com",
            "password" => Hash::make($contraseña),
            "name" => "Employer",
        ]);
        $user->saveOrFail();

        $contraseña = "331";
        $user = new User([
            "email" => "client@gmail.com",
            "password" => Hash::make($contraseña),
            "name" => "Client+",
        ]);
        $user->saveOrFail();
    }
}
