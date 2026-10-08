<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Throwable;

class UserController
{
    public function getAllUsers()
    {
        try {
            $users = User::all();
            return new SuccessResponse(200, 'Users found successfully.', $users)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }

    public function getUserById(int $id)
    {
        try {
            $user = User::findOrFail($id);
            return new SuccessResponse(200, 'User found successfully.', $user)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }

    public function addUser(Request $request)
    {
        $validated = $request->validate(
            [
                'first_name' => ['required', 'string', 'max:100'],
                'last_name' => ['required', 'string', 'max:100'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => ['required', 'min:8'],
                'password_validation' => ['required', 'same:password']
            ],
            [
                'email.unique' => 'Cet email est déjà utilisé.',
                'password_validation.same' => 'Les mots de passe ne correspondent pas.'
            ]
        );

        try {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password'])
            ]);

            return (new SuccessResponse(201, 'User created successfully', $user))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while creating user.'))->send();
        }
    }

    public function editUser(Request $request, int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        $validated = $request->validate(
            [
                'first_name' => ['sometimes', 'string', 'max:100'],
                'last_name' => ['sometimes', 'string', 'max:100'],
                'email' => ['sometimes', 'email', 'unique:users,email,' . $id],
                'password' => ['nullable', 'min:8'],
                'password_validation' => ['required_with:password', 'same:password']
            ],
            [
                'email.unique' => 'Mail already used.',
                'password_validation.same' => 'Passwords do not match.'
            ]
        );

        try {
            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }

            $user->update($validated);

            return (new SuccessResponse(200, 'User updated successfully.', $user))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while updating user.'))->send();
        }
    }

    public function deleteUser(int $id)
    {
        $user = User::with('tags')->find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        try {
            $user->delete();
            return (new SuccessResponse(200, 'User deleted successfully.', $user))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse(500, 'Error while deleting user.'))->send();
        }
    }

    public function getRecipes(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        try {
            $recipes = $user->recipes()->with('tags')->get();
            return (new SuccessResponse(200, 'Recipes found successfully.', $recipes))->send();
        } catch (Throwable $e) {
            return (new ErrorResponse($e->getCode(), $e->getMessage()))->send();
        }
    }
}
