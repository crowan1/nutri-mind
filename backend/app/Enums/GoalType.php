<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

enum GoalType: string
{
    use HasValues;

    case ZERO_WASTE = 'zero-waste';
    case SAVE_MONEY = 'save-money';
    case LOSE_WEIGHT = 'lose-weight';
    case EAT_HEALTHIER = 'eat-healthier';
    case SAVE_TIME = 'save-time';
    case GAIN_MUSCLE = 'gain-muscle';
}
