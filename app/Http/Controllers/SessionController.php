<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\http\Requests\SessionRequest;

class SessionController extends Controller
{
    public function index(){
        $sessions = Session::all();
        return response()->json($sessions);
    }

    public function store(SessionRequest $request){
        $session = new Session();
        $session->refSession = $request->refSession;
        $session->save();
        return response()->json(['isGood'=>true]);
    }

    public function show(Session $session, $id){
        $session = Session::find($id);
        return response()->json($session);
    }

    public function update(SessionRequest $request,$id){
        $session = Session::find($id);
        $session->refSession = $request->refSession;
        $session->save();
        return response()->json(['isGood'=>true]);
    }

    public function destroy($id){
        Session::destroy($id);
        return response()->json(['isGood'=>true]);
    }

}