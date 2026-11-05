<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// Steps of the activity factor used by the energy-expenditure formulas
// (Harris-Benedict and friends), from the most sedentary to the most active.
enum ActivityLevel: string
{
    use HasValues;

    case SEDENTARY = 'sedentary';
    case LIGHT = 'light';
    case MODERATE = 'moderate';
    case ACTIVE = 'active';
    case ATHLETE = 'athlete';
}
