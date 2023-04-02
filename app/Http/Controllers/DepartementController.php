<?php

namespace App\Http\Controllers;


use App\Models\departement;
use Illuminate\Http\Request;

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
        // return view('departements.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'nameDepartement' => 'required|unique:departements|max:255',
        //     'descriptionDepartement' => 'required|max:255', ]);
            
        //     $departement = new Departement();
        //     $departement->nameDepartement = $request->nameDepartement;
        //     $departement->descriptionDepartement = $request->descriptionDepartement;
        //     $departement->save();
    
        //     return redirect()->route('departements.index')->with('success', 'Departement created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $departement = Departement::findOrFail($id);
        // return view('departements.show', compact('departement'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // $departement = Departement::findOrFail($id);
        // return view('departements.edit', compact('departement'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // $validated = $request->validate([
        //     'nameDepartement' => 'required|max:255|unique:departements,nameDepartement,'.$id,
        //     'descriptionDepartement' => 'required|max:255',
        // ]);

        // $departement = Departement::findOrFail($id);
        // $departement->nameDepartement = $request->nameDepartement;
        // $departement->descriptionDepartement = $request->descriptionDepartement;
        // $departement->save();

        // return redirect()->route('departements.index')->with('success', 'Departement updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(departement $id)
    {
        // $departement = Departement::findOrFail($id);
        // $departement->delete();

        // return redirect()->route('departements.index')->with('success', 'Departement deleted successfully.');
    }
}
