<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        $categories = Category::getTree($categories);

        return view('index', compact('categories'));
    }

    public function showProducts(Request $request, Category $category)
    {
        $products = $category->products;
        $categories = Category::all();
        $categories = Category::getTree($categories);

        return view('show', compact('products', 'categories', 'category'));
    }
}
