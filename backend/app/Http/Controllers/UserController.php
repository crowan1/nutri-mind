<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class UserController
{
    public function getAllUsers()
    {
        try {
            $users = User::all();
            return new SuccessResponse(200, 'Users found successfully.', $users)->send();
        } catch (Throwable $e) {
            Log::error('getAllUsers failed', ['exception' => $e]);
            return new ErrorResponse(500, 'Error while fetching users.')->send();
        }
    }

    public function getUserById(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        return (new SuccessResponse(200, 'User found successfully.', $user))->send();
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
            Log::error('addUser failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while creating user.'))->send();
        }
    }

    public function editUser(Request $request, int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        if ($request->user()->id !== $user->id) {
            return (new ErrorResponse(403, 'You can only edit your own account.'))->send();
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

        // password_validation only exists to compare the two inputs, it is not
        // a column: dropping it keeps the mass update clean.
        unset($validated['password_validation']);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = bcrypt($validated['password']);
        }

        try {
            $user->update($validated);

            return (new SuccessResponse(200, 'User updated successfully.', $user))->send();
        } catch (Throwable $e) {
            Log::error('editUser failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while updating user.'))->send();
        }
    }

    public function deleteUser(Request $request, int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        if ($request->user()->id !== $user->id) {
            return (new ErrorResponse(403, 'You can only delete your own account.'))->send();
        }

        try {
            $user->delete();
            return (new SuccessResponse(200, 'User deleted successfully.', $user))->send();
        } catch (Throwable $e) {
            Log::error('deleteUser failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while deleting user.'))->send();
        }
    }

    public function getRecipes(Request $request, int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        if ($request->user()->id !== $user->id) {
            return (new ErrorResponse(403, 'You can only list your own recipes.'))->send();
        }

        try {
            $recipes = $user->recipes()->with('tags')->get();
            return (new SuccessResponse(200, 'Recipes found successfully.', $recipes))->send();
        } catch (Throwable $e) {
            Log::error('getRecipes failed', ['exception' => $e]);
            return (new ErrorResponse(500, 'Error while fetching recipes.'))->send();
        }
    }
}
