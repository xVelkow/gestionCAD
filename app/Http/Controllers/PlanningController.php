<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Http\Requests\PlanningRequest;
class PlanningController extends Controller
{
    public function index(){
        $columns = ['id','titlePlanning'];
        $planning = Planning::all($columns);
        return response()->json($planning);
    }

    public function store(PlanningRequest $request){
        try{
            $planning = new Planning();
            $planning->titlePlanning = $request->titlePlanning;
            $planning->descriptionPlanning = $request->descriptionPlanning;
            $planning->save();
            return response()->json(['isGood'=>true]);
        }catch(Exception $e){
            return response()->json(['isGood'=>false]);
        }
        
    }


    public function show(Planning $planning,$id)
    {
        $planning = Planning::find($id);
        return response()->json($planning);
    }

    public function update(PlanningRequest $request, Planning $planning,$id)
    {
        try{
            $planning = Planning::find($id);
            $planning->titlePlanning = $request->titlePlanning;
            $planning->descriptionPlanning = $request->descriptionPlanning;
            $planning->save();
            return response()->json(['isGood'=>true]);
        }catch(Exception $e){
            return response()->json(['isGood'=>false]);
        }
        
    }

    public function destroy(Planning $planning,$id)
    {
        Planning::destroy($id);
        return response()->json(['isGood'=>true]);
    }
}
