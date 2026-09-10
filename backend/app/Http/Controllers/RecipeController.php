<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;

class RecipeController extends Controller
{
    public function getAllRecipes() {
        $recipes = Recipe::all();
        return $recipes;
    }
}
