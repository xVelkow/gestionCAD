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
        <li><a href="{{route('Members.index')}}">Show Members</a></li>
        <li><a href="{{route('Members.create')}}">Create a Member</a></li>
    </ul>
    <h1>this is index</h1>
    @foreach($members as $member)
    <p>cef : {{$member['cefMember']}}</p>
    <span><a href="{{route('Members.show',$member['cefMember'])}}">more</a></span>
    <span><a href="{{route('Members.edit',$member['cefMember'])}}">edit</a></span>
    <form action="{{route('Members.destroy',$member['cefMember'])}}" method="post">
    @csrf    
    @method('delete')
        <button type="submit">Delete</button>
    </form>
    @endforeach

</body>
</html>