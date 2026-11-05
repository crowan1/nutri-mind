<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// The fourteen allergens that must be declared by law, narrowed to the ones
// that come up often enough in home cooking to deserve a checkbox.
enum AllergenType: string
{
    use HasValues;

    case GLUTEN = 'gluten';
    case LACTOSE = 'lactose';
    case PEANUTS = 'peanuts';
    case TREE_NUTS = 'tree-nuts';
    case EGGS = 'eggs';
    case FISH = 'fish';
    case SHELLFISH = 'shellfish';
    case SOY = 'soy';
    case SESAME = 'sesame';
    case MUSTARD = 'mustard';
}
