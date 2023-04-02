<?php

namespace App\Http\Controllers;


use App\Models\departement;
use Illuminate\Http\Request;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departements = Departement::all();
        return view('departements.index', compact('departements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return view('departements.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $validated = $request->validate([
            'nameDepartement' => 'required|max:255',
            'descriptionDepartement' => 'required',
        ]);
    
        $departement = Departement::create([
            'nameDepartement' => $validated['nameDepartement'],
            'descriptionDepartement' => $validated['descriptionDepartement']
        ]);
    
    
    
        if ($departement) {
            return redirect()->route('departements.index');
        } 
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $departement = Departement::find($id);
        return view('departements.show', compact('departement'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $department = Departement::find($id);
        return view('departements\edit', compact('department'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nameDepartement' => 'required|max:255',
            'descriptionDepartement' => 'required',
        ]);
      
        $department = Departement::find($id);
        
        $department->nameDepartement = $validated['nameDepartement'];
        $department->descriptionDepartement = $validated['descriptionDepartement'];
    
    
        $department->save();
    
        return redirect()->route('departements.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $departement = Departement::find($id);
        if ($departement) {
            $departement->delete();
            return redirect()->route('departements.index') ;
        }
        return redirect()->route('departements.index');
    }
}
