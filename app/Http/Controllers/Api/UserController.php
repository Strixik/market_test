<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserCreateForm;
use App\Http\Requests\User\UserUpdateForm;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = User::all();

        return response()->json(
            [
                'status' => 'success',
                'users' => $users,
                'roles' => User::ROLES,
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserCreateForm $request
     * @return JsonResponse
     */
    public function store(UserCreateForm $request)
    {
        $user = new User;
        $request->merge(['password' => Hash::make($request->password)]);
        $user->fill($request->all())->save();

        return response()->json(['status' => 'success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);

        if (! empty($user)) {
            return response()->json(
                [
                    'status' => 'success',
                    'user' => $user,

                ], 200);
        }

        return response()->json(
            [
                'status' => 'error',
            ], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateForm $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UserUpdateForm $request, $id)
    {
        $user = User::find($id);

        if (! empty($request->password)) {
            $request->merge(['password' => Hash::make($request->password)]);
        }
        $user->fill($request->all())->save();

        return response()->json(
            [
                'status' => 'success',
                'user' => $user,
            ], 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json([], 204);
    }
}
