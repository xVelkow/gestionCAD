<head>
    <style>
        div{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        h1{
            text-align: center;
        }
        table, th,td{
            border: 1px solid black;
        }
        th,td{
            width: 8em;
            padding: .6em;
            text-transform: lowercase;
        }
    </style>
</head>
<body>
    <div>
    <h1>Members List</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            @foreach($members as $member)
                <tr>
                    <td>{{$member->id}}</td>
                    <td>{{$member->fullNameMember}}</td>
                    <td>{{$member->departmentMember}}</td>
                    <td>{{$member->roleMember}}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    </div>
</body>