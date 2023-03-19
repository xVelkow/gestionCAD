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
        // $validated = $request->validated();
    
        // try {
        //     $sessioncreate = Session::create([
        //         'nomSession' => $request->nomSession
        //     ]);
            
        //     if ($sessioncreate) {
        //         return redirect()->route('sessions.index');
        //     }
        // } catch(Exception $e) {
        //     $e = 'Something went wrong';
        //     return redirect()->route('sessions.index', compact('e'));
        // }
        try{
            $session = new Session();
            $session->refSession = $request->refSession;
            if($session->save()){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }
    
    }

    public function show(Session $session, $id){
        $session = Session::find($id);
        return response()->json($session);
    }

    public function update(SessionRequest $request,$id)
    { 
        
        // $validated = $request->validated();
        try{
            $session = Session::find($id);
            $session->refSession = $request->refSession;
            if($session->save()){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }

        // return redirect()->route('sessions.show', ['session' => $id]);
    }

    public function destroy($id){
        // $session = Session::findOrFail($idSession);

        // if(Session::destroy($idSession)){
        //     return redirect(route('sessions.index'));
        // } else {
        // $e = "something-went-wrong";
        // return redirect(route('sessions.index',compact('e')));
        try{
            if(Session::destroy($id)){
                return response()->json(['isGood'=>true]);
            }
        }catch(Exception $error){
            return response()->json(['isGood'=>false]);
        }
    }

}