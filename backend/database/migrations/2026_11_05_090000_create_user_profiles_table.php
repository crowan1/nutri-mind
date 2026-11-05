<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Everything the profile screen collects lives here rather than on `users`:
     * that table is the credential record, read on every authenticated request,
     * and it has no business carrying twenty preference columns most endpoints
     * never look at. One row per user, created with the account.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            $table->date('birth_date')->nullable();
            $table->string('sex', 16)->nullable();

            $table->boolean('calorie_tracking')->default(false);
            $table->unsignedSmallInteger('height_cm')->nullable();
            $table->string('activity_level', 32)->nullable();

            // Kilograms to one decimal, which is what a bathroom scale reads.
            // Fixed point rather than a float: these get subtracted from one
            // another to show progress, and a float would drift doing it.
            $table->decimal('start_weight_kg', 5, 1)->nullable();
            $table->decimal('target_weight_kg', 5, 1)->nullable();
            $table->decimal('current_weight_kg', 5, 1)->nullable();

            $table->string('diet', 32)->nullable();

            // Lists of slugs from the matching enums. JSON rather than pivot
            // tables: the vocabularies are closed, small, and only ever read
            // whole, so a join table would buy nothing.
            $table->json('allergies')->nullable();
            $table->json('goals')->nullable();
            $table->json('equipment')->nullable();
            $table->json('disliked_foods')->nullable();
            $table->json('notifications')->nullable();

            $table->unsignedTinyInteger('household_size')->default(1);
            $table->unsignedSmallInteger('weekly_budget')->nullable();
            $table->string('cooking_level', 32)->default('beginner');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
