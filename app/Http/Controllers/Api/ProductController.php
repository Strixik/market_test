<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CreateProduct;
use App\Http\Requests\Product\EditProduct;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        return response()->json(
            [
                'status' => 'success',
                'products' => $products,
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateProduct $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProduct $request)
    {
        $product = new Product();
        $product->fill($request->all())->save();


        return response()->json([
            'status' => 'success'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        $products = Product::all();

        if (!empty($product)) {
            return response()->json(
                [
                    'status' => 'success',
                    'product' => $product,
                    'products' => $products,
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
     * @param EditProduct $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditProduct $request, $id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $product->fill($request->all())->save();
            $products = Product::all();
            return response()->json(
                [
                    'status' => 'success',
                    'product' => $product,
                    'products' => $products,
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
        $product = Product::find($id);
        $product->delete();
        return response()->json([], 204);
    }

    public function search(Request $request)
    {
        $search = Product::where('name', 'like', '%' . $request->keywords . '%')
            ->limit(5)
            ->get();
        return response()->json($search, 200);
    }
}
