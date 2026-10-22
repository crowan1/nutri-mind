<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeTags extends Model
{
    use HasFactory;

    protected $table = 'recipe_tags';
    protected $fillable = ['recipe_id', 'tag_id'];
}
