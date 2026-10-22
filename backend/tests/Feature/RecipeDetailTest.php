<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\Tag;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecipeDetailTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_ingredients_relation_resolves_the_pivot_table(): void
    {
        $recipe = Recipe::factory()->create();

        RecipeIngredient::factory()->create([
            'recipe_id' => $recipe->id,
            'ingredient_id' => Ingredient::factory()->create(['name' => 'Poireau'])->id,
            'unit_id' => Unit::factory()->create(['name' => 'g'])->id,
            'quantity' => 250,
        ]);

        $this->assertSame(1, $recipe->ingredients()->count());
        $this->assertSame('Poireau', $recipe->ingredients()->first()->name);
        $this->assertSame(250, (int) $recipe->ingredients()->first()->pivot->quantity);
    }

    public function test_an_ingredient_keeps_its_name_on_mass_assignment(): void
    {
        $ingredient = Ingredient::create(['name' => 'Tomate', 'price' => 1.2, 'weight' => 120]);

        $this->assertSame('Tomate', $ingredient->fresh()->name);
    }

    public function test_the_detail_endpoint_returns_tags_and_ingredients(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create(['name' => 'Soupe de poireaux']);

        $recipe->tags()->attach(Tag::factory()->create(['name' => 'rapide'])->id);

        RecipeIngredient::factory()->create([
            'recipe_id' => $recipe->id,
            'ingredient_id' => Ingredient::factory()->create(['name' => 'Poireau'])->id,
            'unit_id' => Unit::factory()->create(['name' => 'g'])->id,
            'quantity' => 250,
        ]);

        $this->actingAs($user)
            ->getJson("/api/recipe/{$recipe->id}")
            ->assertOk()
            ->assertJsonPath('data.name', 'Soupe de poireaux')
            ->assertJsonPath('data.tags.0.name', 'rapide')
            ->assertJsonPath('data.recipe_ingredients.0.ingredient.name', 'Poireau')
            ->assertJsonPath('data.recipe_ingredients.0.unit.name', 'g');
    }
}
