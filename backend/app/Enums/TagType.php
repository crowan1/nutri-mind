<?php

namespace App\Enums;

enum TagType: string
{
    // Types de repas & rôles
    case STARTER = 'entrée';
    case MAIN_DISHP = 'plat';
    case DESSERT = 'dessert';
    case BREAKFAST = 'petit-déjeuner';
    case BRUNCH = 'brunch';
    case SNACK = 'goûter';
    case APETIZER = 'apéro';
    case BEVERAGE = 'boisson';
    case SAUCE = 'sauce';
    case SIDE_DISH = 'accompagnement';

        // Régimes & Santé
    case VEGETARIAN = 'végétarien';
    case VEGAN = 'végétalien';
    case PESCATARIAN = 'pescatarien';
    case GLUTEN_FREE = 'sans gluten';
    case LACTOSE_FREE = 'sans lactose';
    case EGG_FREE = 'sans œuf';
    case SUGAR_FREE = 'sans sucre ajouté';
    case LOW_CARB = 'low carb';
    case KETO = 'céto';
    case HEALTHY = 'healthy';
    case ANTI_WASTE = 'anti-gaspi';

        // Temps & Préparation
    case QUICK = 'rapide';
    case EXPRESS = 'express';
    case EASY = 'facile';
    case NO_COOKING = 'sans cuisson';
    case BATCH_COOKING = 'batch cooking';
    case CHEAP = 'petit budget';

        // Saisons & Occasions
    case SPRING = 'printemps';
    case SUMMER = 'été';
    case AUTUMN = 'automne';
    case WINTER = 'hiver';
    case CHRISTMAS = 'noël';
    case BARBECUE = 'barbecue';
    case PICNIC = 'pique-nique';
    case COZY = 'réconfortant';

        // Origines & Cuisines
    case FRENCH = 'cuisine française';
    case ITALIAN = 'cuisine italienne';
    case ASIAN = 'cuisine asiatique';
    case MEXICAN = 'cuisine mexicaine';
    case MEDITERRANEAN = 'méditerranéenne';
    case INDIAN = 'cuisine indienne';
    case ORIENTAL = 'cuisine orientale';
    case AMERICAN = 'cuisine américaine';
    case STREET_FOOD = 'street food';

        // Modes de cuisson
    case OVEN = 'au four';
    case PAN = 'à la poêle';
    case STEAM = 'à la vapeur';
    case SLOW_COOK = 'mijoté';
    case AIRFRYER = 'airfryer';

        // Profil gustatif
    case SWEET = 'sucré';
    case SAVORY = 'salé';
    case SWEET_SAVORY = 'sucré-salé';
    case SPICY = 'épicé';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
