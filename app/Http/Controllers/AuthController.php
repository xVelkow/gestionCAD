<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function Login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function Logout(){
        session()->invalidate();
    }
}
