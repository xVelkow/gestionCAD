<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    @isset($e)
    <h1>{{$e}}</h1>
    @endisset
    <form action="{{route('sessions.store')}}" method="post">
        @csrf
        nom session: <input type="text" name="nomSession">
        <button type="submit">send</button>
    </form>
    
<a href="{{ route('sessions.index') }}">Back to sessions index</a>
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