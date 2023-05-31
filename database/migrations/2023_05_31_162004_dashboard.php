<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared
        (
            "CREATE PROCEDURE getMembers()
            BEGIN
                SELECT * FROM members;
            END;"
        );
        DB::unprepared
        (
            "CREATE PROCEDURE getDepartments()
            BEGIN
                SELECT * FROM departments;
            END;"
        );
        DB::unprepared
        (
            "CREATE PROCEDURE getPlannings()
            BEGIN
                SELECT * FROM plannings;
            END;"
        );
        DB::unprepared
        (
            "CREATE PROCEDURE getPosts()
            BEGIN
                SELECT * FROM posts;
            END;"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS getMembers");
        DB::unprepared("DROP PROCEDURE IF EXISTS getDepartments");
        DB::unprepared("DROP PROCEDURE IF EXISTS getPlannings");
        DB::unprepared("DROP PROCEDURE IF EXISTS getPosts");
    }
};
