<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RecipeIngredient extends Pivot
{
    use HasFactory;

    protected $table = 'recipe_ingredient';

    // The table carries its own auto-incrementing id, which a Pivot assumes
    // it does not have.
    public $incrementing = true;

    protected $fillable = ['recipe_id', 'ingredient_id', 'unit_id', 'quantity'];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }
}
