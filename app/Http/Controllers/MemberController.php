<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Member;
use Exception;


class MemberController extends Controller
{
    public function index(){
        $columns = ['cefMember','fullNameMember','departmentMember','roleMember'];
        $members = Member::all($columns);
        return response()->json($members);
    }

    public function store(MemberRequest $request){
        try{
            $s = 'salam';
            $member = new Member();
            $member->cefMember = $request->cefMember;
            $member->fullNameMember = $request->fullNameMember;
            $member->groupMember = $request->groupMember;
            $member->passwordMember = Hash::make($s);
            $member->emailMember = $request->emailMember;
            $member->departmentMember = $request->departmentMember;
            $member->roleMember = $request->roleMember;
            if($member->save()){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }
    }

    public function show(Member $member, $cef){
            $member = Member::find($cef)->toArray();
            return response()->json($member);
    }
    public function update(MemberRequest $request, Member $member,$cef){
        try{
            $member = Member::find($cef);
            $member->cefMember = $request->cefMember;
            $member->fullNameMember = $request->fullNameMember;
            $member->groupMember = $request->groupMember;
            $member->emailMember = $request->emailMember;
            $member->departmentMember = $request->departmentMember;
            $member->roleMember = $request->roleMember;
            if($member->save()){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }
    }

    public function destroy(Member $member,$cef){
        try{
            if(Member::destroy($cef)){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }
    }
}
