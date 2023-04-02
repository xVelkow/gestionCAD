<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<ul>
        <li><a href="{{ route('departements.index')}}">Show departements</a></li>
        <li><a href="{{route('departements.create')}}">Create a deparetement</a></li>
</ul>
    @foreach($departements as $department)
    <p>departement id: {{$department['id']}}</p>
    <p>departement name:{{$department['nameDepartement']}} </p>
    <p>departement discription:{{$department['descriptionDepartement']}}</p>
    <a href="{{ route('departements.edit', $department['id']) }}">Edit</a>
    <a href="{{ route('departements.show', $department['id']) }}">more</a>
    <form action="{{ route('departements.destroy', $department['id']) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Delete</button>
    </form>
    @endforeach

</body>
</html>
