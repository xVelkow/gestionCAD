<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeetingRequest;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function index()
    {
        $meetings = Meeting::all(['id', 'TitleMeeting', 'DateMeeting', 'RoomMeeting']);
        return response()->json($meetings);
    }

    public function store(MeetingRequest $request)
    {
        $meeting = new Meeting();
        $meeting->TitleMeeting = $request->TitleMeeting;
        $meeting->DateMeeting = $request->DateMeeting;
        $meeting->RoomMeeting = $request->RoomMeeting;
        $meeting->save();
        return response()->json(['isGood' => true]);
    }

    public function show($id)
    {
        $meeting = Meeting::find($id, ['id', 'TitleMeeting', 'DateMeeting', 'RoomMeeting']);
        return response()->json($meeting);
    }

    public function update(MeetingRequest $request, $id)
    {
        $meeting = Meeting::find($id);
        $meeting->TitleMeeting = $request->TitleMeeting;
        $meeting->DateMeeting = $request->DateMeeting;
        $meeting->RoomMeeting = $request->RoomMeeting;
        $meeting->save();
        return response()->json(['isGood' => true]);
    }

    public function destroy($id)
    {
        Meeting::destroy($id);
        return response()->json(['isGood' => true]);
    }
}
