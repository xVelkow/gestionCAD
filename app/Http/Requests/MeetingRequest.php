<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class MeetingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(Request $request): array
    {
        return [
            $request->validate(
                [
                    'titleMeeting' => 'required|max:255',
                    'dateMeeting' => 'required|date_format:d-m-y',
                    'roomMeeting' => 'required|max:255'
                ])
                
        ];
    }
}
