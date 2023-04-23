<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('members')->insert([
            'id' => '0',
            'fullNameMember' => 'admin',
            'email' => 'admin@ofppt-edu.ma',
            'password' => Hash::make('admin'),
            'departmentMember' => 'Developpment',
            'roleMember' => 'Super-Admin',
            'sessionMember' => '2022-2023'
        ]);
    }
}
