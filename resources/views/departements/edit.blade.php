<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <form action="{{ route('departements.update', ['departement' => $department->id]) }}" method="POST">
    @csrf
    @method('PUT')

    <label for="nameDepartement">name:</label>
    <input id="nameDepartement" type="text" name="nameDepartement" value="{{ $department->nameDepartement }}">
    <br>
    <label for="descriptionDepartement">description:</label>
    <textarea id="descriptionDepartement" name="descriptionDepartement">{{ $department->descriptionDepartement }}</textarea>
    <br>                               
    <button type="submit" class="btn btn-primary">Save Changes</button>
</form>   
<a href="{{ route('departements.index') }}">Back to departements index</a> 
@if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif      
</body>
</html>
   
