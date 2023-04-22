<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    // protected $primaryKey = 'cefMember';
    public $timestamps = false;
    protected $hidden = ['password'];

}
