<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\user;
class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $arregloPermisos =[
            "create users",
            "view users",
            "edit users",
            "delete users",
            "create roles",
            "view roles",
            "edit roles",
            "delete roles",
            "request loans",
            "view loans",
            "view own loans",
            "edit loans",
            "approve or decline loans",
            "download contracts",
            "download own contracts",
            "delete loans",
            "create payments",
            "view payments",
            "view own payments",
            "edit payments",
            "approve or decline payments",
            "delete payments",
        ];

        
        $permisos= collect($arregloPermisos)->map(function($permisos){
            return ["name"=>$permisos,"guard_name"=>"web"];
        });

        Permission::insert($permisos->toArray());

        //Se crean los roles y las bases de datos
       Role::create(["name" => "admin"])->givePermissionTo(Permission::whereNotIn('id',array(11,15,19)));
       Role::create(["name" => "employee"])->givePermissionTo(['create users','view users', 'view loans', 'download contracts', 'view payments', 'approve or decline payments']);
       Role::create(["name" => "client"])->givePermissionTo(['view own loans', 'download own contracts', 'create payments', 'view own payments']);

        //Asignar roles a los 3 primeros usuarios
        user::find(1)->assignRole('admin');
        user::find(2)->assignRole('employee');
        user::find(3)->assignRole('client');
        
    }
}
