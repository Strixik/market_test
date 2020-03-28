<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditCategory extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $ids = Category::getTreeIds(Category::all(), $this->id);
        return [
            'name' => [
                'required',
                'string',
                'max:255'

            ],
            'description' => 'nullable|string|min:3',
            'parent_id' => [
                'integer',
                'nullable',
                'not_in:' . $this->id,
                Rule::notIn($ids)
            ]
        ];

    }
}
