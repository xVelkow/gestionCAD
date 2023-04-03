<?php

namespace App\Http\Controllers;


use App\Models\department;
use App\Http\Requests\DepartmentRequest;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentController extends Controller
{
    public function index(){
        $columns = ['id','nameDepartment'];
        $departments = Department::all($columns);
        return response()->json($departments);
    }

    public function store(DepartmentRequest $request){
        $department = new Department();
        $department->nameDepartment = $request->nameDepartment;
        $department->descriptionDepartment = $request->descriptionDepartment;
        $department->save();
        return response()->json(['isGood'=>true]);
    }

    public function show(Department $department, $id){
        $department = Department::find($id);
        return response()->json($department);
    }

    public function update(Department $department, DepartmentRequest $request, $id){
        $department = Department::find($id);
        $department->nameDepartment = $request->nameDepartment;
        $department->descriptionDepartment = $request->descriptionDepartment;
        $department->save();
        return response()->json(['isGood'=>true]);
    }

    public function destroy(Department $department, $id){
        Department::destroy($id);
        return response()->json(['isGood'=>true]);
    }
}
