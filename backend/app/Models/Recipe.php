<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table('recipes')]
#[Fillable('name', 'description', 'difficulty', 'peopleNb', 'isFavorite', 'duration', 'user_id')]
class Recipe extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // The pivot has to be named: Laravel would otherwise derive it
    // alphabetically as ingredient_recipe, and the table is recipe_ingredient.
    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient')
            ->using(RecipeIngredient::class)
            ->withPivot('quantity', 'unit_id')
            ->withTimestamps();
    }

    // Reading the pivot as its own rows is what lets the unit be eager loaded
    // alongside the ingredient; a belongsToMany pivot cannot carry relations.
    public function recipeIngredients(): HasMany
    {
        return $this->hasMany(RecipeIngredient::class, 'recipe_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'recipe_tags');
    }
}
