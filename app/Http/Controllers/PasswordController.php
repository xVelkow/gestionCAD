<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Member;

class PasswordController extends Controller{
    public function change(Request $request,$id){
        $member = Member::find($id);
        $member->password = Hash::make($request->password);
        $member->save();
        return response()->json(['changed'=>true]);
    }
}
