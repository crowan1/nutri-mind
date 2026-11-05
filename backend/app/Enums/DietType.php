<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// Main diet: one per user, and it filters every recipe.
enum DietType: string
{
    use HasValues;

    case OMNIVORE = 'omnivore';
    case FLEXITARIAN = 'flexitarian';
    case VEGETARIAN = 'vegetarian';
    case VEGAN = 'vegan';
    case PESCATARIAN = 'pescatarian';
    case KETO = 'keto';
    case GLUTEN_FREE = 'gluten-free';
    case HALAL = 'halal';
}
