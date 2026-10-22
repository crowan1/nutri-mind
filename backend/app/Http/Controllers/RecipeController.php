<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class RecipeController
{
    public function getAllRecipes()
    {
        try {
            $recipes = Recipe::with('tags')->get();
            return new SuccessResponse(200, 'Recipes found successfully.', $recipes)->send();
        } catch (Throwable $e) {
            Log::error('getAllRecipes failed', ['exception' => $e]);
            return new ErrorResponse(500, 'Error while fetching recipes.')->send();
        }
    }

    public function getRecipeById(int $id)
    {
        $recipe = Recipe::with('tags')->find($id);

        if (!$recipe) {
            return (new ErrorResponse(404, 'Recipe not found.'))->send();
        }

        return (new SuccessResponse(200, 'Recipe found successfully', $recipe))->send();
    }

    public function addRecipe(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:30'],
            'description' => ['required', 'string', 'max:255'],
            'difficulty' => ['required', 'string', 'in:facile,intermédiaire,difficile'],
            'peopleNb' => ['required', 'integer', 'min:1', 'max:10'],
            'duration' => ['required', 'integer', 'min:1'],
            'isFavorite' => ['required', 'boolean'],
        ]);

        // The owner comes from the session, never from the payload: letting the
        // client pick user_id would allow creating recipes on someone else.
        $validated['user_id'] = $request->user()->id;

        try {
            $recipe = Recipe::create($validated);

            return (new SuccessResponse(201, 'Recipe created successfully', $recipe))->send();
        } catch (Throwable $e) {
            Log::error('addRecipe failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while creating recipe.'))->send();
        }
    }

    public function editRecipe(Request $request, int $recipe_id)
    {
        $recipe = Recipe::find($recipe_id);

        if (!$recipe) {
            return (new ErrorResponse(404, 'Recipe not found.'))->send();
        }

        if ($request->user()->id !== $recipe->user_id) {
            return (new ErrorResponse(403, 'You can only edit your own recipes.'))->send();
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:30'],
            'description' => ['sometimes', 'string', 'max:255'],
            'difficulty' => ['sometimes', 'string', 'in:facile,intermédiaire,difficile'],
            'peopleNb' => ['sometimes', 'integer', 'min:1', 'max:10'],
            'duration' => ['sometimes', 'integer', 'min:1'],
            'isFavorite' => ['sometimes', 'boolean'],
        ]);

        try {
            $recipe->update($validated);

            return (new SuccessResponse(200, 'Recipe updated successfully.', $recipe))->send();
        } catch (Throwable $e) {
            Log::error('editRecipe failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while updating recipe.'))->send();
        }
    }

    public function deleteRecipe(Request $request, int $recipe_id)
    {
        $recipe = Recipe::find($recipe_id);

        if (!$recipe) {
            return (new ErrorResponse(404, 'Recipe not found.'))->send();
        }

        if ($request->user()->id !== $recipe->user_id) {
            return (new ErrorResponse(403, 'You can only delete your own recipes.'))->send();
        }

        try {
            $recipe->delete();
            return (new SuccessResponse(200, 'Recipe deleted successfully.', $recipe))->send();
        } catch (Throwable $e) {
            Log::error('deleteRecipe failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while deleting recipe.'))->send();
        }
    }
}
