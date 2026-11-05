<?php

namespace App\Http\Controllers;

use App\Enums\ActivityLevel;
use App\Enums\AllergenType;
use App\Enums\CookingLevel;
use App\Enums\DietType;
use App\Enums\EquipmentType;
use App\Enums\GoalType;
use App\Enums\NotificationType;
use App\Enums\SexType;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;

class ProfileController
{
    // The screen edits the account and its preferences as one form, so these
    // columns travel with the profile payload even though they live on `users`.
    private const ACCOUNT_FIELDS = ['first_name', 'last_name', 'email'];

    public function show(Request $request)
    {
        $user = $request->user();

        try {
            $user->ensureProfile();

            return (new SuccessResponse(200, 'Profile found successfully.', $user))->send();
        } catch (Throwable $e) {
            Log::error('showProfile failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while fetching profile.'))->send();
        }
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate($this->rules($user->id), [
            'email.unique' => 'Cet email est déjà utilisé.',
            'target_weight_kg.max' => 'Un objectif au-delà de 400 kg est sûrement une faute de frappe.',
        ]);

        try {
            $profile = $user->ensureProfile();

            $user->update(array_intersect_key($validated, array_flip(self::ACCOUNT_FIELDS)));
            $profile->update(array_diff_key($validated, array_flip(self::ACCOUNT_FIELDS)));

            // `update` writes the models in place but leaves the loaded
            // relation holding the values the request started with.
            $user->setRelation('profile', $profile->fresh());

            return (new SuccessResponse(200, 'Profile updated successfully.', $user))->send();
        } catch (Throwable $e) {
            Log::error('updateProfile failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while updating profile.'))->send();
        }
    }

    /**
     * Every field is `sometimes`: the form posts whole, but a client sending a
     * single changed key has to stay valid.
     */
    private function rules(int $userId): array
    {
        return [
            'first_name' => ['sometimes', 'string', 'max:100'],
            'last_name' => ['sometimes', 'string', 'max:100'],
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],

            // A birth date in the future, or one that would make the user 120,
            // is a typo rather than a person.
            'birth_date' => ['sometimes', 'nullable', 'date', 'before:today', 'after:1900-01-01'],
            'sex' => ['sometimes', 'nullable', Rule::in(SexType::values())],

            'calorie_tracking' => ['sometimes', 'boolean'],
            'height_cm' => ['sometimes', 'nullable', 'integer', 'min:50', 'max:260'],
            'activity_level' => ['sometimes', 'nullable', Rule::in(ActivityLevel::values())],
            'start_weight_kg' => ['sometimes', 'nullable', 'numeric', 'min:20', 'max:400'],
            'target_weight_kg' => ['sometimes', 'nullable', 'numeric', 'min:20', 'max:400'],

            // Deliberately absent: `current_weight_kg`. It is written by the
            // weigh-ins recorded on the Forme screen, not by this form, and
            // accepting it here would let the two sources disagree.

            'diet' => ['sometimes', 'nullable', Rule::in(DietType::values())],

            'allergies' => ['sometimes', 'array'],
            'allergies.*' => [Rule::in(AllergenType::values())],
            'goals' => ['sometimes', 'array'],
            'goals.*' => [Rule::in(GoalType::values())],
            'equipment' => ['sometimes', 'array'],
            'equipment.*' => [Rule::in(EquipmentType::values())],

            // Free text, unlike the lists above: what someone simply dislikes
            // is not a closed vocabulary.
            'disliked_foods' => ['sometimes', 'array', 'max:30'],
            'disliked_foods.*' => ['string', 'max:40'],

            // `array:` names the only keys allowed, which keeps the column
            // from collecting settings no screen reads.
            'notifications' => ['sometimes', 'array:' . implode(',', NotificationType::values())],
            'notifications.*' => ['boolean'],

            'household_size' => ['sometimes', 'integer', 'min:1', 'max:20'],
            'weekly_budget' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:2000'],
            'cooking_level' => ['sometimes', Rule::in(CookingLevel::values())],
        ];
    }
}
