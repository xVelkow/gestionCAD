<?php

namespace App\Http\Controllers;
use App\Http\Requests\MemberRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Member;
use Exception;
use DB;


class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $members = Member::all()->toArray();
        return view('Member.index',compact('members'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
        return view('Member.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MemberRequest $r){
        try{
            if(DB::table('members')->insert([
                'cefMember' => $r->cefMember,
                'firstNameMember' => $r->firstNameMember,
                'lastNameMember' => $r->lastNameMember,
                'groupMember' => $r->groupMember,
                'emailMember' => $r->emailMember,
                'passwordMember' => Hash::make(Str::random(16)),
                'departmentMember' => $r->departmentMember,
                'roleMember' => $r->roleMember
            ])){
                return redirect(route('Members.index'));
            }
        }catch(Exception $e){
            $e = "something-went-wrong";
            return redirect()->route('Members.create',compact('e'));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member, $cef){
            $member = Member::find($cef)->toArray();
            return view('Member.show',compact('member'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member,$cef){
        $member = Member::find($cef)->toArray();
        return view('Member.edit',compact('cef','member'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MemberRequest $request, Member $member,$cef){
        try{
            $member = Member::find($cef);
            $member->cefMember = $request->cefMember;
            $member->firstNameMember = $request->firstNameMember;
            $member->lastNameMember = $request->lastNameMember;
            $member->groupMember = $request->groupMember;
            $member->emailMember = $request->emailMember;
            $member->departmentMember = $request->departmentMember;
            $member->roleMember = $request->roleMember;
            if($member->save()){
                return redirect(route('Members.index'));
            }
        }catch(Exception $e){
            $e = "something-went-wrong";
            return redirect()->route('Members.edit',[$cef,$e]);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member,$cef){
        if(Member::destroy($cef)){
            return redirect(route('Members.index'));
        }else{
            $e = "something-went-wrong";
            return redirect(route('Members.index',compact('e')));
        }
    }
}
