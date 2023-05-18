<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);
        if(Auth::attempt($credentials)){
            $ability = null;
            $user = Auth::user();
            if(Str::lower($user->roleMember) == 'super-admin'){
                $ability = ['admin'];
            }else if(Str::lower($user->roleMember) == 'president'){
                $ability = ['president'];
            }else if(Str::lower($user->roleMember) == 'vice-president'){
                $ability = ['vice-president'];
            }else if(Str::lower($user->departmentMember) == 'communication'){
                $ability = ['communication'];
            }else if(Str::lower($user->departmentMember) == 'social media'){
                $ability = ['social-media'];
            }else{
                $ability = ['member'];
            }
            $token = $request->user()->createToken('token',$ability);
            return response()->json(['token'=>$token->plainTextToken, 'user'=>$user]);
        }
        return response()->json(false);
    }
    public function logout(Request $request){
        // $request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();
    }
}
