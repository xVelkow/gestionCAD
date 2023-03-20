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
    <form action="{{route('Members.store')}}" method="post">
        @csrf
        cef : <input type="text" name="cefMember"><br><br>
        first name : <input type="text" name="firstNameMember"><br><br>
        last name : <input type="text" name="lastNameMember"><br><br>
        group : <input type="text" name="groupMember"><br><br>
        email : <input type="text" name="emailMember"><br><br>
        department : <input type="text" name="departmentMember"><br><br>
        role : <input type="text" name="roleMember"><br><br>
        <button type="submit">send</button>
    </form>
</body>
</html>