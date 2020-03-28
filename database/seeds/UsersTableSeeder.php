<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'password' => Hash::make('123456'),
                'role' => 2
            ]];
        DB::table('users')->insert($users);
    }


}
