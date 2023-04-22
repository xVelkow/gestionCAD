<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);
        if(Auth::attempt($credentials)){
            $token = $request->user()->createToken('token');
            return response()->json(['token'=>$token->plainTextToken]);
        }
        return response()->json(false);
    }
    public function logout(Request $request){
        // $request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();
    }
}
