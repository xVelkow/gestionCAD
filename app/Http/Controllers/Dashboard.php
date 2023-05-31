<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Department;
use App\Models\Post;
use App\Models\Planning;
use Illuminate\Support\Facades\DB;


class Dashboard extends Controller
{
    public function getDashboardData($session){
        // $memberResult = Member::get()->where('sessionMember','=',$session);
        // $departmentResult = Department::get()->where('sessionDepartment','=',$session);
        // $postResult = Post::get()->where('sessionPost','=',$session);
        // $planningResult = Planning::get()->where('sessionPlanning','=',$session);
        // return response()->json([
        //     'data' =>
        //     [
        //         'members' => $memberResult,
        //         'departments' => $departmentResult,
        //         'posts' => $postResult,
        //         'planning' => $planningResult
        //     ]
        // ]);
        $members = DB::select("CALL getMembers()");
        $departments = DB::select("CALL getDepartments()");
        $plannings = DB::select("CALL getPlannings()");
        $posts = DB::select("CALL getPosts()");
        return response()->json([
            'data'=>[
                'members' => $members,
                'departments' => $departments,
                'posts' => $posts,
                'planning' => $plannings
            ]
        ]);

    }
}
