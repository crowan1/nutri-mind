<?php

namespace App\Response;

class ErrorResponse
{
    public string $message;
    public int $code;
    public bool $success;

    public function __construct(int $code = 500, string $message)
    {
        $this->code = $code;
        $this->message = $message;
        $this->success = false;
    }

    public function send()
    {
        return response()->json([
            'code' => $this->code,
            'success' => $this->success,
            'message' => $this->message,
        ]);
    }
}
