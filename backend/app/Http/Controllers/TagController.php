<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class TagController
{
    public function getAllTags()
    {
        try {
            $tags = Tag::all();
            return new SuccessResponse(200, 'Tags found successfully.', $tags)->send();
        } catch (Throwable $e) {
            Log::error('getAllTags failed', ['exception' => $e]);
            return new ErrorResponse(500, 'Error while fetching tags.')->send();
        }
    }

    public function getTagById(int $id)
    {
        $tag = Tag::find($id);

        if (!$tag) {
            return (new ErrorResponse(404, 'Tag not found.'))->send();
        }

        return (new SuccessResponse(200, 'Tag found successfully.', $tag))->send();
    }
}
