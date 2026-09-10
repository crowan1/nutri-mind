<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'getAllUsers']);
Route::get('/user/{id}', [UserController::class, 'getUserById']);
Route::post('/users', [UserController::class, 'addUser']);
Route::put('/user/{id}', [UserController::class, 'editUser']);
Route::delete('/user/{id}', [UserController::class, 'deleteUser']);

Route::get('/recipes', [RecipeController::class, 'getAllRecipes']);
