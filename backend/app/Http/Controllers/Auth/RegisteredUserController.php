<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    public function store(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => Str::before($validated['email'], '@'),
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        Auth::login($user);

        $request->session()->regenerate();

        return response()->json([
            'user' => $user,
        ], 201);
    }
}
