<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Throwable;

class RecipeController extends Controller
{
    public function getAllRecipes()
    {
        try {
            $users = Recipe::all();
            return new SuccessResponse(200, 'Recipes found successfully.', $users)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }
}
