<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);

    // Second entry point for account creation, kept for the API consumers that
    // do not go through the Breeze register flow.
    Route::post('/users', [UserController::class, 'addUser']);
});

Route::middleware('auth:sanctum')->group(function () {
    // The profile rides along with the session check: the sidebar, the
    // completion meter and the recipe filters all read it, so fetching it
    // separately would only add a round trip to every arrival.
    Route::get('/user', function (Request $request) {
        return $request->user()->load('profile');
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);

    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::get('/user/{id}', [UserController::class, 'getUserById']);
    Route::put('/user/{id}', [UserController::class, 'editUser']);
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);
    Route::get('/user/{id}/recipes', [UserController::class, 'getRecipes']);

    Route::get('/recipes', [RecipeController::class, 'getAllRecipes']);
    Route::get('/recipe/{id}', [RecipeController::class, 'getRecipeById']);
    Route::post('/recipes', [RecipeController::class, 'addRecipe']);
    Route::put('/recipe/{id}', [RecipeController::class, 'editRecipe']);
    Route::delete('/recipe/{id}', [RecipeController::class, 'deleteRecipe']);

    Route::get('/tags', [TagController::class, 'getAllTags']);
    Route::get('/tag/{id}', [TagController::class, 'getTagById']);
});
