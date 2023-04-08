<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AuthController;


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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('/Login',function(){echo "log";});
Route::post('/Login',[AuthController::class,'Login'])->name('login');
Route::get('/Logout',[AuthController::class,'Logout'])->name('logout');
Route::resources([
    'Members' => MemberController::class,
    'Sessions' => SessionController::class,
    'Plannings' => PlanningController::class,
    'Posts' => PostController::class,
    'Departments' => DepartmentController::class
]);
