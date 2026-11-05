<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

enum CookingLevel: string
{
    use HasValues;

    case BEGINNER = 'beginner';
    case INTERMEDIATE = 'intermediate';
    case ADVANCED = 'advanced';
}
