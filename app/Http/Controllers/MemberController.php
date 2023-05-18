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
        $columns = ['id','fullNameMember','departmentMember','roleMember'];
        $members = Member::where('roleMember','<>','Super-Admin')->get($columns);
        return response()->json($members);
    }

    public function store(MemberRequest $request){
            $s = 'salam';
            $member = new Member();
            $member->id = $request->id;
            $member->fullNameMember = $request->fullNameMember;
            $member->password = Hash::make($s);
            $member->email = $request->email;
            $member->departmentMember = $request->departmentMember;
            $member->roleMember = $request->roleMember;
            $member->sessionMember = $request->sessionMember;
            $member->save();
            return response()->json(['isGood'=>true]);
    }

    public function show(Member $member, $id){
            $member = Member::find($id);
            if(!$member || $member->roleMember == 'Super-Admin') return response()->json([]); 
            return response()->json($member);
    }
    public function update(MemberRequest $request, Member $member,$id){
            $member = Member::find($id);
            // if($member->roleMember == 'Super-Admin') return response()->json(['isGood'=>false]);
            $member->id = $request->id;
            $member->fullNameMember = $request->fullNameMember;
            $member->groupMember = $request->groupMember;
            $member->email = $request->email;
            $member->departmentMember = $request->departmentMember;
            $member->roleMember = $request->roleMember;
            $member->sessionMember = $request->sessionMember;
            $member->save();
            return response()->json(['isGood'=>true]);
    }

    public function destroy(Member $member,$id){
        Member::destroy($id);
        return response()->json(['isGood'=>true]);
    }
}
