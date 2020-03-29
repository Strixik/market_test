<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', 'IndexController@index');
Route::get('/show/{category}', 'IndexController@showProducts')->name('category-products');

Route::prefix('src')->group(function () {
    Route::get('/{any?}', function () {
        return view('app');
    })->where('any', '^(?!api\/)[\/\w\.-]*');
});
