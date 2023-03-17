<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\http\Requests\SesssionRequest;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sessions = Session::all();

        return view('Session.index', compact('sessions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('Session.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SessionRequest $request)
    {
        
      
        try{
            $sessioncreate = Session::create([
           'nomSession' => $request->nomSession]);
           if($sessioncreate){
               return redirect()->route('sessions.index');}}
       catch(Exception $e) {
           return $e;}
                   
    }

    /**
     * Display the specified resource.
     */
    public function show($idSession)
    {
        $session = Session::find($idSession);

        return view('Session\show',compact('session'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($idSession)
    {
        
        try{
         
           
            $session = Session::find($idSession);
                if($session){
                return view('Session\edit', compact('session'));}  }
        catch(Exception $e) {
            return $e;}
      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$idSession)
    {
        $validatedData= $request->validate([
            'nomSession' => ['required', 'regex:/^\d{4}-\d{4}$/', Rule::unique('sessions')->ignore($idSession, 'idSession')],
        ]);
        
        
        $session = Session::findOrFail($idSession);
        $session->nomSession = $request->input('nomSession');
        $session->save();

        return redirect()->route('sessions.show', ['session' => $idSession]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $idSession){
        $session = Session::findOrFail($idSession);

    if(Session::destroy($idSession)){
        return redirect(route('sessions.index'));
    } else {
        $e = "something-went-wrong";
        return redirect(route('sessions.index',compact('e')));
    }

}
}