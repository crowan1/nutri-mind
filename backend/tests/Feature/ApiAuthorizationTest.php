<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_resource_routes_reject_guests(): void
    {
        $this->getJson('/api/recipes')->assertUnauthorized();
        $this->getJson('/api/users')->assertUnauthorized();
        $this->getJson('/api/tags')->assertUnauthorized();
    }

    public function test_a_user_cannot_edit_or_delete_another_account(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($user)
            ->putJson("/api/user/{$other->id}", ['first_name' => 'Pirate'])
            ->assertForbidden();

        $this->actingAs($user)
            ->deleteJson("/api/user/{$other->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('users', ['id' => $other->id, 'first_name' => $other->first_name]);
    }

    public function test_a_user_can_delete_their_own_account(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->deleteJson("/api/user/{$user->id}")
            ->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_a_user_cannot_touch_someone_elses_recipe(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create();

        $this->actingAs($user)
            ->putJson("/api/recipe/{$recipe->id}", ['name' => 'Volée'])
            ->assertForbidden();

        $this->actingAs($user)
            ->deleteJson("/api/recipe/{$recipe->id}")
            ->assertForbidden();

        $this->actingAs($user)
            ->getJson("/api/user/{$recipe->user_id}/recipes")
            ->assertForbidden();
    }

    public function test_a_created_recipe_belongs_to_the_authenticated_user(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/recipes', [
                'name' => 'Soupe de poireaux',
                'description' => 'Une soupe simple.',
                'difficulty' => 'facile',
                'peopleNb' => 4,
                'duration' => 30,
                'isFavorite' => false,
                'user_id' => $other->id,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('recipes', [
            'name' => 'Soupe de poireaux',
            'user_id' => $user->id,
        ]);
    }

    public function test_a_missing_recipe_returns_a_real_404(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/recipe/999999')
            ->assertNotFound();
    }
}
