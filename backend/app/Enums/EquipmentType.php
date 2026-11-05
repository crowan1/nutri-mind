<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// Appliances the household owns: suggesting a recipe that needs an oven to
// someone who has none is a wasted suggestion.
enum EquipmentType: string
{
    use HasValues;

    case OVEN = 'oven';
    case MICROWAVE = 'microwave';
    case STOVE = 'stove';
    case BLENDER = 'blender';
    case STAND_MIXER = 'stand-mixer';
    case AIR_FRYER = 'air-fryer';
    case STEAMER = 'steamer';
    case PRESSURE_COOKER = 'pressure-cooker';
    case TOASTER = 'toaster';
    case KETTLE = 'kettle';
    case COFFEE_MACHINE = 'coffee-machine';
    case CREPE_PAN = 'crepe-pan';
}
