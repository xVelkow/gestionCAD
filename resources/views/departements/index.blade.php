<!-- @extends('layouts.app')

@section('content')
<div class="container">
    <h1>Departments</h1>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($departments as $department)
                    <tr>
                        <td>{{ $department->id }}</td>
                        <td>{{ $department->name }}</td>
                        <td>{{ $department->description }}</td>
                        <td>
                            <a href="{{ route('departments.show', ['department' => $department->id]) }}" class="btn btn-sm btn-info">View</a>
                            <a href="{{ route('departments.edit', ['department' => $department->id]) }}" class="btn btn-sm btn-primary">Edit</a>
                            <form action="{{ route('departments.destroy', ['department' => $department->id]) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this department?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="text-center">
                {{ $departments->links() }}
            </div>
        </div>
    </div>
</div>
@endsection -->
