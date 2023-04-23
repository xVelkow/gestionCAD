<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class MemberRequest extends FormRequest
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
            $request->validate([
                'id'=>['bail','string','required','between:13,13','alpha_num'],
                'fullNameMember'=>['bail','string','required','max:100'],
                'email'=>['bail','email','ends_with:@ofppt-edu.ma','required','max:100'],
                'groupMember'=>['bail','string','max:25'],
                'departmentMember'=>['bail','string','required','max:100'],
                'roleMember'=>['bail','string','required','max:30'],
                'sessionMember' => ['bail','string','required','max:9']
            ])
        ];
    }
}
