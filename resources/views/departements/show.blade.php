<!-- @extends('layouts.app')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                {{ $departement->nameDepartement }}
            </div>
            <div class="card-body">
                <p class="card-text">{{ $departement->descriptionDepartement }}</p>
            </div>
            <div class="card-footer">
                <a href="{{ route('departements.edit', ['departement' => $departement->id]) }}" class="btn btn-primary">Edit</a>
                <form action="{{ route('departements.destroy', ['departement' => $departement->id]) }}" method="POST" class="d-inline">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
@endsection -->
