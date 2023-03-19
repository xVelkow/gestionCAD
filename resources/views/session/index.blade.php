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
        <li><a href="{{route('sessions.index')}}">Show sessions</a></li>
        <li><a href="{{route('sessions.create')}}">Create a session</a></li>
    </ul>

    @foreach($sessions as $Sessions)
    <p>session id: {{$Sessions['idSession']}}</p>
    <p>session name:{{$Sessions['nomSession']}} </p>
    <span><a href="{{route('sessions.show',$Sessions['idSession'])}}">more</a></span>
    <span><a href="{{route('sessions.edit',$Sessions['idSession'])}}">edit</a></span>
    <form action="{{route('sessions.destroy',$Sessions['idSession'])}}" method="post">
    @csrf    
    @method('delete')
        <button type="submit">Delete</button>
    </form>
    @endforeach

</body>
</html>