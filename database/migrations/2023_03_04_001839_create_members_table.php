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
        Schema::create('members', function (Blueprint $table) {
            $table->string('cefMember')->primary()->unique()->nullable(false);
            $table->string('fullNameMember')->nullable(false);
            $table->string('groupMember')->nullable(false);
            $table->string('emailMember')->unique()->nullable(false);
            $table->string('passwordMember')->nullable(false);
            $table->string('departmentMember')->nullable(false);
            $table->string('roleMember')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
