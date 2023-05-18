<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout',[AuthController::class,'logout']);
    Route::resource('Members',MemberController::class); //->middleware('ability:admin,president,vice-president,communication')
    Route::resource('Sessions',SessionController::class)->middleware('ability:admin,president,vice-president,communication,social-media');
    Route::resource('Plannings',PlanningController::class)->middleware('ability:admin,president');
    Route::resource('Posts',PostController::class)->middleware('ability:admin,president,vice-president,social-media');
    Route::resource('Departments',DepartmentController::class); //->middleware('ability:admin,president,vice-president,communication')
    Route::patch('/changePassword/{id}',[PasswordController::class,'change']);
});