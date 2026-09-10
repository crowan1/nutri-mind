<?php

namespace App\Response;

class SuccessResponse
{
    public string $message;
    public int $code;
    public string $data;
    public bool $success;

    public function __construct(int $code = 200, string $message, string $data)
    {
        $this->code = $code;
        $this->message = $message;
        $this->data = $data;
        $this->success = true;
    }

    public function send()
    {
        return response()->json([
            'code' => $this->code,
            'success' => $this->success,
            'message' => $this->message,
            'response' => json_decode($this->data)
        ]);
    }
}
