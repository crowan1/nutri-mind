<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\RecipeTags;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RecipeTags>
 */
class RecipeTagsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recipe_id' => Recipe::factory(),
            'tag_id' => Tag::factory(),
        ];
    }
}
