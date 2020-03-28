<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CreateCategory;
use App\Http\Requests\Category\EditCategory;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories_all = Category::with('products')->get();
        $categories = Category::getTree($categories_all);

        return response()->json(
            [
                'status' => 'success',
                'categories' => $categories,
                'categories_all' => $categories_all,
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCategory $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCategory $request)
    {
        $category = new Category();
        $category->fill($request->all())->save();


        return response()->json(['status' => 'success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::with('products')->where(['id' => $id])->firstOrFail();
        $categories = Category::with('products')->get();
        $categories = Category::getTree($categories, $id);
        $category->child = $categories;

        if (!empty($category)) {
            return response()->json(
                [
                    'status' => 'success',
                    'category' => $category,
                    'category_child' => $categories,
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
     * @param EditCategory $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditCategory $request, $id)
    {
        $category = Category::find($id);
        if (!empty($category)) {
            $category->fill($request->all())->save();
            $categories = Category::all();
            return response()->json(
                [
                    'status' => 'success',
                    'category' => $category,
                    'categories' => $categories,
                ], 200);
        }

        return response()->json(
            [
                'status' => 'error',
            ], 404);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json([], 204);
    }


    public function addProductCategory(Request $request)
    {
        $category = Category::find($request->category_id);

        if (!$category->products->contains($request->product_id)) {
            $category->products()->attach($request->product_id);
        }

        return response()->json('', 200);
    }


    public function deleteProductCategory(Request $request)
    {
        $category = Category::find($request->category_id);
        $category->products()->detach($request->product_id);
        return response()->json([], 204);
    }
}
