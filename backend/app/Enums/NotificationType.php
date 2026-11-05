<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// Each case is a key of the profile's `notifications` map, holding a boolean.
enum NotificationType: string
{
    use HasValues;

    case EXPIRY_ALERTS = 'expiry-alerts';
    case RECIPE_SUGGESTIONS = 'recipe-suggestions';
    case SHOPPING_REMINDER = 'shopping-reminder';
    case WEEKLY_REPORT = 'weekly-report';
}
