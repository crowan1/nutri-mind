<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * The project replaced Laravel's single `name` column with `first_name`
     * and `last_name` by editing the create_users migration in place, which
     * only reaches databases rebuilt from scratch. Everywhere else the table
     * still has `name` — and since the model never writes it, every insert
     * fails on a NOT NULL column nothing fills. This brings those databases
     * to the shape the create migration now describes.
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'first_name') && !Schema::hasColumn('users', 'name')) {
            return;
        }

        // Added nullable so the statement goes through on a table that already
        // has rows; the backfill below is what lets them take their final,
        // non-nullable shape.
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name')->nullable()->after('id');
            }

            if (!Schema::hasColumn('users', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
        });

        if (Schema::hasColumn('users', 'name')) {
            // Split on the first space: "Marie Claire Dupont" becomes Marie /
            // Claire Dupont. Guessing where a compound first name ends is not
            // something a migration should try.
            foreach (DB::table('users')->select('id', 'name')->get() as $row) {
                $name = trim((string) $row->name);

                DB::table('users')->where('id', $row->id)->update([
                    'first_name' => Str::before($name, ' '),
                    'last_name' => Str::contains($name, ' ') ? Str::after($name, ' ') : '',
                ]);
            }

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('name');
            });
        }

        DB::table('users')->whereNull('first_name')->update(['first_name' => '']);
        DB::table('users')->whereNull('last_name')->update(['last_name' => '']);

        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable(false)->change();
            $table->string('last_name')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'name')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
        });

        foreach (DB::table('users')->select('id', 'first_name', 'last_name')->get() as $row) {
            DB::table('users')->where('id', $row->id)->update([
                'name' => trim($row->first_name.' '.$row->last_name),
            ]);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->dropColumn(['first_name', 'last_name']);
        });
    }
};
