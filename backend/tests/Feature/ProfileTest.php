<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_profile_routes_reject_guests(): void
    {
        $this->getJson('/api/profile')->assertUnauthorized();
        $this->putJson('/api/profile', ['first_name' => 'Pirate'])->assertUnauthorized();
    }

    public function test_reading_the_profile_creates_the_missing_row(): void
    {
        // Accounts made before the table existed, which the factory reproduces
        // by creating a user and no profile.
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.profile.notifications.expiry-alerts', true);

        $this->assertDatabaseCount('user_profiles', 1);
    }

    public function test_one_request_updates_the_account_and_its_preferences(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->putJson('/api/profile', [
                'first_name' => 'Camille',
                'height_cm' => 174,
                'diet' => 'flexitarian',
                'allergies' => ['gluten', 'lactose'],
                'household_size' => 3,
            ])
            ->assertOk()
            ->assertJsonPath('data.first_name', 'Camille')
            ->assertJsonPath('data.profile.allergies', ['gluten', 'lactose']);

        $this->assertDatabaseHas('users', ['id' => $user->id, 'first_name' => 'Camille']);
        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'height_cm' => 174,
            'diet' => 'flexitarian',
            'household_size' => 3,
        ]);
    }

    public function test_values_outside_the_vocabularies_are_rejected(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->putJson('/api/profile', [
                'diet' => 'carnivore',
                'allergies' => ['gluten', 'plutonium'],
                'height_cm' => 900,
                'notifications' => ['spam-me' => true],
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['diet', 'allergies.1', 'height_cm', 'notifications']);
    }

    public function test_the_current_weight_is_not_editable_from_the_profile(): void
    {
        $user = User::factory()->create();
        $user->ensureProfile()->update(['current_weight_kg' => 77.6]);

        $this->actingAs($user)
            ->putJson('/api/profile', ['current_weight_kg' => 60])
            ->assertOk();

        // It belongs to the weigh-ins recorded on the Forme screen; the form
        // showing it read-only has to be backed by the server refusing it.
        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'current_weight_kg' => 77.6,
        ]);
    }

    public function test_the_session_check_carries_the_profile(): void
    {
        $user = User::factory()->create();
        $user->ensureProfile()->update(['cooking_level' => 'advanced']);

        $this->actingAs($user)
            ->getJson('/api/user')
            ->assertOk()
            ->assertJsonPath('profile.cooking_level', 'advanced');
    }
}
