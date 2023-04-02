<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departement extends Model
{
    use HasFactory;
    protected $table = 'departements';
    protected $fillable = [ 'descriptionDepartement', 'nameDepartement'];
    public $timestamps = false;
}
