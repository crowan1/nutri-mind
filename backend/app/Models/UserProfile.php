<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('user_profiles')]
#[Fillable(
    'birth_date',
    'sex',
    'calorie_tracking',
    'height_cm',
    'activity_level',
    'start_weight_kg',
    'target_weight_kg',
    'current_weight_kg',
    'diet',
    'allergies',
    'goals',
    'equipment',
    'disliked_foods',
    'notifications',
    'household_size',
    'weekly_budget',
    'cooking_level',
)]
class UserProfile extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'birth_date' => 'date:Y-m-d',
            'calorie_tracking' => 'boolean',
            'height_cm' => 'integer',
            'household_size' => 'integer',
            'weekly_budget' => 'integer',
            // Decimal casts keep the trailing ".0" MySQL returns as a string
            // from reaching the client as "80.0" in a field the user edits.
            'start_weight_kg' => 'float',
            'target_weight_kg' => 'float',
            'current_weight_kg' => 'float',
            'allergies' => 'array',
            'goals' => 'array',
            'equipment' => 'array',
            'disliked_foods' => 'array',
            'notifications' => 'array',
        ];
    }
}
