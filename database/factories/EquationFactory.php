<?php

namespace Database\Factories;

use App\Models\Equation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Equation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'variable' => $this->faker->randomLetter,
            'expression' => `{$this->faker->randomNumber} + {$this->faker->randomNumber}`,
            'user_id' => function(){

                return User::factory()->create()->id;
            }
        ];
    }
}
