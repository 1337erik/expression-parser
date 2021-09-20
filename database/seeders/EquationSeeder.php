<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class EquationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Equation::factory(1)->create([

            'user_id' => User::first()->id,
            'variable' => 'a',
            'expression' => '13 + 37'
        ]);
        \App\Models\Equation::factory(1)->create([

            'user_id' => User::first()->id,
            'variable' => 'b',
            'expression' => 'a - 1'
        ]);
    }
}
