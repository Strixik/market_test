<?php

namespace App\Models;

use App\Models\Traits\Tree;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Tree;

    protected $table = 'category';
    protected $fillable = [
        'parent_id', 'name', 'description',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function delete()
    {
        self::deleteTree(self::all(), $this->id);

        return parent::delete();
    }

}
