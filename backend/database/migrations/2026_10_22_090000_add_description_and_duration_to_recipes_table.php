<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Both columns first landed as an edit to the create_recipes migration,
     * which only reaches databases rebuilt from scratch. The guards let this
     * run on either state.
     */
    public function up(): void
    {
        Schema::table('recipes', function (Blueprint $table) {
            if (!Schema::hasColumn('recipes', 'description')) {
                $table->string('description')->after('name');
            }

            if (!Schema::hasColumn('recipes', 'duration')) {
                $table->integer('duration')->after('peopleNb');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recipes', function (Blueprint $table) {
            $table->dropColumn(['description', 'duration']);
        });
    }
};
