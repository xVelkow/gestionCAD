<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class SessionRequest extends FormRequest

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
                'refSession' => ['required', 'regex:/^\d{4}-\d{4}$/', Rule::unique('sessions')]
            ])
        ];

    }
      /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
   public function messages(): array
   {
       return [
           'nomSession.required' => 'The session name is required.',
           'nomSession.regex' => 'The session name must be in the format of "xxxx-xxxx".',
           'nomSession.unique' => 'The session name has already been taken.',
       ];
   }
   
}