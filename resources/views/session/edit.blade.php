<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="{{ route('sessions.update', $session->idSession) }}" method="post">
        @csrf
        @method('PUT')
      
        nom Session:<input type="text" name="nomSession" value="{{$session->nomSession}}">
        <button type="submit">send</button> <button><a href="{{route('sessions.show',$session['idSession'])}}">Cancel</a></button>

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
    <a href="{{ route('sessions.index') }}">Back to sessions index</a>

</body>
</html>