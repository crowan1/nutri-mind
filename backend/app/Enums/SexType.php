<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

// Every profile vocabulary is stored as an English slug rather than a French
// label: these values are keys — the front end matches on them, and the
// recommendation queries will too — and an accent in a key is a bug waiting to
// happen. The interface owns the translation.
enum SexType: string
{
    use HasValues;

    case FEMALE = 'female';
    case MALE = 'male';
    case OTHER = 'other';
}
