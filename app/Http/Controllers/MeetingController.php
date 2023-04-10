<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeetingRequest;
use App\Models\Meeting;

class MeetingController extends Controller
{
    public function index()
    {
        $meetings = Meeting::all(['id', 'TitleMeeting']);
        return response()->json($meetings);
    }

    public function store(MeetingRequest $request)
    {
        $meeting = new Meeting();
        $meeting->titleMeeting = $request->titleMeeting;
        $meeting->dateMeeting = $request->dateMeeting;
        $meeting->roomMeeting = $request->roomMeeting;
        $meeting->save();
        return response()->json(['isGood' => true]);
    }

    public function show($id)
    {
        $meeting = Meeting::find($id);
        return response()->json($meeting);
    }

    public function update(MeetingRequest $request, $id)
    {
        $meeting = Meeting::find($id);
        $meeting->titleMeeting = $request->titleMeeting;
        $meeting->dateMeeting = $request->dateMeeting;
        $meeting->roomMeeting = $request->roomMeeting;
        $meeting->save();
        return response()->json(['isGood' => true]);
    }

    public function destroy($id)
    {
        Meeting::destroy($id);
        return response()->json(['isGood' => true]);
    }
}
