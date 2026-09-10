<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Http\Request;
use Throwable;

class UserController extends Controller
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

    public function editUser(Request $request, int $user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return (new ErrorResponse(404, 'User not found.'))->send();
        }

        $validated = $request->validate(
            [
                'first_name' => ['sometimes', 'string', 'max:100'],
                'last_name' => ['sometimes', 'string', 'max:100'],
                'email' => ['sometimes', 'email', 'unique:users,email,' . $user_id],
                'password' => ['nullable', 'min:8'],
                'password_validation' => ['required_with:password', 'same:password']
            ],
            [
                'email.unique' => 'Cet email est déjà utilisé.',
                'password_validation.same' => 'Les mots de passe ne correspondent pas.'
            ]
        );
    }

    public function deleteUser(int $user_id)
    {
        $user = User::find($user_id);
        dd($user);
    }
}
