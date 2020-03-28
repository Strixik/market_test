<?php

namespace App\Models;

use App\Models\Product\Replacement;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    protected $table = 'product';
    protected $fillable = [
        'name', 'price', 'description'
    ];




}
