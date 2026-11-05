<?php

namespace Database\Factories;

use App\Enums\ActivityLevel;
use App\Enums\AllergenType;
use App\Enums\CookingLevel;
use App\Enums\DietType;
use App\Enums\EquipmentType;
use App\Enums\GoalType;
use App\Enums\NotificationType;
use App\Enums\SexType;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startWeight = fake()->randomFloat(1, 50, 110);

        return [
            'user_id' => User::factory(),
            'birth_date' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'sex' => fake()->randomElement(SexType::values()),

            'calorie_tracking' => fake()->boolean(),
            'height_cm' => fake()->numberBetween(150, 200),
            'activity_level' => fake()->randomElement(ActivityLevel::values()),
            'start_weight_kg' => $startWeight,
            // The goal hangs off the starting weight so the pair reads as one
            // person rather than two unrelated draws.
            'target_weight_kg' => round($startWeight - fake()->randomFloat(1, -5, 10), 1),
            'current_weight_kg' => round($startWeight - fake()->randomFloat(1, 0, 4), 1),

            'diet' => fake()->randomElement(DietType::values()),
            'allergies' => fake()->randomElements(AllergenType::values(), rand(0, 3)),
            'goals' => fake()->randomElements(GoalType::values(), rand(1, 3)),
            'equipment' => fake()->randomElements(EquipmentType::values(), rand(3, 8)),
            'disliked_foods' => fake()->randomElements(
                ['champignons', 'coriandre', 'olives', 'abats', 'épinards', 'anchois'],
                rand(0, 3),
            ),
            'notifications' => array_map(
                fn () => fake()->boolean(70),
                array_flip(NotificationType::values()),
            ),

            'household_size' => fake()->numberBetween(1, 5),
            'weekly_budget' => fake()->numberBetween(30, 150),
            'cooking_level' => fake()->randomElement(CookingLevel::values()),
        ];
    }
}
