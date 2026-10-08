<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Throwable;

class RecipeController
{
    public function getAllRecipes()
    {
        try {
            $recipes = Recipe::all();
            return new SuccessResponse(200, 'Recipes found successfully.', $recipes)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }

    public function getRecipeById(int $id)
    {
        try {
            $recipe = Recipe::with('tags')->findOrFail($id);
            return new SuccessResponse(200, 'Recipe found successfully', $recipe)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }

    public function addRecipe(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:30'],
            'difficulty' => ['required', 'string', 'in:facile,intermédiaire,difficile'],
            'peopleNb' => ['required', 'integer', 'min:1', 'max:10'],
            'isFavorite' => ['required', 'boolean'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
        ]);

        try {
            $recipe = Recipe::create($validated);

            return (new SuccessResponse(201, 'Recipe created successfully', $recipe))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while creating recipe.'))->send();
        }
    }

    public function editRecipe(Request $request, int $recipe_id)
    {
        $recipe = Recipe::find($recipe_id);

        if (!$recipe) {
            return (new ErrorResponse(404, 'Recipe not found.'))->send();
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:30'],
            'difficulty' => ['sometimes', 'string', 'in:facile,intermédiaire,difficile'],
            'peopleNb' => ['sometimes', 'integer', 'min:1', 'max:10'],
            'isFavorite' => ['sometimes', 'boolean'],
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
        ]);

        try {
            $recipe->update($validated);

            return (new SuccessResponse(200, 'Recipe updated successfully.', $recipe))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while updating recipe.'))->send();
        }
    }

    public function deleteRecipe(int $recipe_id)
    {
        $recipe = Recipe::find($recipe_id);

        if (!$recipe) {
            return (new ErrorResponse(404, 'Recipe not found.'))->send();
        }

        try {
            $recipe->delete();
            return (new SuccessResponse(200, 'Recipe deleted successfully.', $recipe))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while deleting recipe.'))->send();
        }
    }
}
