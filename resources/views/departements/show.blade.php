
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <p>departement id :{{ $departement->id }} </p>
    <p> departement name:{{ $departement->nameDepartement }}</p>
    <p >departement discription:{{ $departement->descriptionDepartement }}</p>
    <a href="{{ route('departements.edit', ['departement' => $departement->id]) }}" >Edit</a>
    <form action="{{ route('departements.destroy', ['departement' => $departement->id]) }}" method="POST" >
    @csrf
    @method('DELETE')
    <button type="submit" >Delete</button>
    </form>
    <a href="{{ route('departements.index') }}">Back to departements index</a>
           
</body>
</html>
