<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Cef : {{$member['cefMember']}}</h1>
    <p>First Name : {{$member['firstNameMember']}}</p>
    <p>Last Name : {{$member['lastNameMember']}}</p>
    <p>Group : {{$member['groupMember']}}</p>
    <p>Email : {{$member['emailMember']}}</p>
    <p>Department : {{$member['departmentMember']}}</p>
    <p>Role : {{$member['roleMember']}}</p>
    <span><a href="{{route('Members.edit',$member['cefMember'])}}">edit</a></span>
    <form action="{{route('Members.destroy',$member['cefMember'])}}" method="post">
    @csrf    
    @method('delete')
        <button type="submit">Delete</button>
    </form>

</body>
</html>