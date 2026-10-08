<?php

namespace Database\Seeders;

use App\Enums\TagType;
use App\Enums\UnitType;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\Tag;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();

        $allUnits = UnitType::values();
        $units = Unit::factory()->count(count($allUnits))->sequence(...array_map(fn($name) => ['name' => $name], $allUnits))->create();

        $allTags = TagType::values();
        $tags = Tag::factory()
            ->count(count($allTags))
            ->sequence(...array_map(fn($name) => ['name' => $name], $allTags))
            ->create();

        $ingredients = Ingredient::factory(30)->create();
        $recipes = Recipe::factory(30)
            ->recycle($users)
            ->create()
            ->each(function (Recipe $recipe) use ($tags) {
                $recipe->tags()->attach(
                    $tags->random(rand(1, 3))->pluck('id')
                );
            });


        RecipeIngredient::factory(50)
            ->recycle($recipes)
            ->recycle($ingredients)
            ->recycle($units)
            ->create();
    }
}
