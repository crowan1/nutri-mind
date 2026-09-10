<?php

namespace App\Enums;

enum UnitType: string
{
    case GRAM = 'g';
    case KILOGRAM = 'kg';
    case MILLIGRAM = 'mg';

    case MILLILITER = 'ml';
    case CENTILITER = 'cl';
    case DECILITER = 'dl';
    case LITER = 'l';
    case CUP = 'tasse';
    case GLASS = 'verre';
    case BOWL = 'bol';

    case TEASPOON = 'c. à c.';
    case TABLESPOON = 'c. à s.';
    case PINCH = 'pincée';
    case TIP = 'pointe';
    case DASH = 'trait';
    case LADLE = 'louche';

    case PIECE = 'pièce';
    case CLOVE = 'gousse';
    case BRANCH = 'branche';
    case SPRIG = 'brin';
    case BUNCH = 'bouquet';
    case LEAF = 'feuille';
    case SLICE = 'tranche';
    case STEAK = 'pavé';
    case FILLET = 'filet';
    case SACHET = 'sachet';
    case CAN = 'boîte';
    case JAR = 'bocal';
    case CUBE = 'cube';
    case HANDFUL = 'poignée';
    case ZEST = 'zeste';
    case JUICE = 'jus';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
