<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    Route::prefix('/src/auth')->group(function () {
        Route::post('register', 'Api\AuthController@register');
        Route::post('login', 'Api\AuthController@login');
        Route::get('refresh', 'Api\AuthController@refresh');
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('user', 'Api\AuthController@user');
            Route::post('logout', 'Api\AuthController@logout');
        });
    });

Route::prefix('src')->group(function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('users', 'Api\UserController@index')->middleware('isAdmin');
        Route::post('users/add', 'Api\UserController@store')->middleware('isAdmin');
        Route::delete('users/{id}', 'Api\UserController@destroy')->middleware('isAdmin');
        Route::get('users/{id}', 'Api\UserController@show')->middleware('isAdmin');
        Route::put('users/{id}', 'Api\UserController@update')->middleware('isAdmin');

        Route::post('category/add_product', 'Api\CategoryController@addProductCategory')->middleware('isAdmin');
        Route::post('category/delete_product', 'Api\CategoryController@deleteProductCategory')->middleware('isAdmin');
        Route::get('categories', 'Api\CategoryController@index')->middleware('isAdmin');
        Route::post('category/add', 'Api\CategoryController@store')->middleware('isAdmin');
        Route::delete('category/{id}', 'Api\CategoryController@destroy')->middleware('isAdmin');
        Route::get('category/{id}', 'Api\CategoryController@show')->middleware('isAdmin');
        Route::put('category/{id}', 'Api\CategoryController@update')->middleware('isAdmin');

        Route::get('product/search', 'Api\ProductController@search')->middleware('isAdmin');
        Route::get('products', 'Api\ProductController@index')->middleware('isAdmin');
        Route::post('product/add', 'Api\ProductController@store')->middleware('isAdmin');
        Route::delete('product/{id}', 'Api\ProductController@destroy')->middleware('isAdmin');
        Route::get('product/{id}', 'Api\ProductController@show')->middleware('isAdmin');
        Route::put('product/{id}', 'Api\ProductController@update')->middleware('isAdmin');
    });
});
