<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->text(30),
            'description' => fake()->text(100),
            'difficulty' => fake()->randomElement(['facile', 'intermédiaire', 'difficile']),
            'peopleNb' => fake()->numberBetween(1, 10),
            'duration' => fake()->numberBetween(5, 120),
            'isFavorite' => fake()->boolean(),
            'user_id' => User::factory()
        ];
    }
}
