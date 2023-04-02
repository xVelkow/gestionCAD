<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>Create Department</h1>
<form action="{{ route('departements.store') }}" method="POST">
    @csrf
    <label for="nameDepartement">Name:</label>
    <input type="text" name="nameDepartement" >
    <br>
    <label for="descriptionDepartement">Description:</label>
    <textarea name="descriptionDepartement" ></textarea>
    <button type="submit" >Create</button>
</form>
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
