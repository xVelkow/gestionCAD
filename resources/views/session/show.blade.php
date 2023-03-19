<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <h1>id session : {{$session->idSession}}</h1>
     <p>session Name : {{$session->nomSession}}</p>
     <span><a href="{{route('sessions.edit',$session->idSession)}}">edit</a></span>
    <form action="{{route('sessions.destroy',$session->idSession)}}"  method="post">
    
    @csrf    
    @method('delete')
        <button type="submit">Delete</button>
  
    </form>
  
<a href="{{ route('sessions.index') }}">Back to sessions index</a>
</body>
</html>