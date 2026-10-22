<?php

namespace App\Response;

class ErrorResponse
{
    public string $message;
    public int $code;
    public bool $success;

    public function __construct(int $code, string $message)
    {
        $this->code = $code;
        $this->message = $message;
        $this->success = false;
    }

    public function send()
    {
        // Exception codes are not HTTP statuses: PDO reports strings, most
        // others report 0. Anything out of range falls back to a plain 500 so
        // response()->json() does not blow up on an invalid status.
        $status = $this->code >= 100 && $this->code <= 599 ? $this->code : 500;

        return response()->json([
            'code' => $status,
            'success' => $this->success,
            'message' => $this->message,
        ], $status);
    }
}
