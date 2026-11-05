<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\NotificationType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\Attributes\UseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

#[Fillable(['first_name', 'last_name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
#[UseModel(User::class)]
class User extends Authenticatable
{
    use HasFactory;

    public function recipes(): HasMany {
        return $this->hasMany(Recipe::class);
    }

    public function profile(): HasOne {
        return $this->hasOne(UserProfile::class);
    }

    // Accounts created before the profile table existed have no row, and
    // neither does one made through a path that forgets to create it. Callers
    // that need the profile ask for it here rather than each guarding against
    // null on their own.
    public function ensureProfile(): UserProfile {
        if ($this->profile) {
            return $this->profile;
        }

        $profile = $this->profile()->create([
            // Opt-in by default: the alerts are the point of the product, and
            // a profile that notifies nothing looks broken on arrival.
            'notifications' => array_fill_keys(NotificationType::values(), true),
        ]);

        // Without this the relation stays cached as null and the caller gets a
        // second INSERT the next time it asks.
        $this->setRelation('profile', $profile);

        return $profile;
    }
}
