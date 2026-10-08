<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Response\ErrorResponse;
use App\Response\SuccessResponse;
use Throwable;

class TagController extends Controller
{
    public function getAllTags()
    {
        try {
            $tags = Tag::all();
            return new SuccessResponse(200, 'Tags found successfully.', $tags)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }

    public function getTagById(int $id)
    {
        try {
            $tag = Tag::findOrFail($id);
            return new SuccessResponse(200, 'Tag found successfully.', $tag)->send();
        } catch (Throwable $e) {
            return new ErrorResponse($e->getCode(), $e->getMessage())->send();
        }
    }
}
