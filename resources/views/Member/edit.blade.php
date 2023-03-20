<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<form action="{{route('Members.update',$cef)}}" method="post">
        @csrf
        @method('PUT')
        cef : <input type="text" name="cefMember" value="{{$cef}}"><br><br>
        first name : <input type="text" name="firstNameMember" value="{{$member['firstNameMember']}}"><br><br>
        last name : <input type="text" name="lastNameMember" value="{{$member['lastNameMember']}}"><br><br>
        group : <input type="text" name="groupMember" value="{{$member['groupMember']}}"><br><br>
        email : <input type="text" name="emailMember" value="{{$member['emailMember']}}"><br><br>
        department : <input type="text" name="departmentMember" value="{{$member['departmentMember']}}"><br><br>
        role : <input type="text" name="roleMember" value="{{$member['roleMember']}}"><br><br>
        <button type="submit">send</button> <button><a href="{{route('Members.show',$member['cefMember'])}}">Cancel</a></button>
    </form>
</body>
</html>