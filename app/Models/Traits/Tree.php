<?php
namespace App\Models\Traits;

use Illuminate\Support\Collection;

trait Tree
{

    /**
     * Create tree array for items
     * @param Collection $items
     * @param integer|null $id
     * @return array
     */
    public static function getTree($items, $id = null)
    {
        $tree = [];

        foreach ($items as $item) {
            if ($item['parent_id'] == $id) {
                $children = self::getTree($items, $item['id']);
                if ($children) {
                    $item['child'] = $children;
                }
                $tree[$item['id']] = $item;
            }
        }

        return $tree;


    }

    /**
     * Create  array ids items
     * @param Collection $items
     * @param integer|null $id
     * @return array
     */
    public static function getTreeIds($items, $id = null)
    {
        $ids = [];

        foreach ($items as $item) {
            if ($item['parent_id'] == $id) {
                $children = self::getTreeIds($items, $item['id']);
                if ($children) {
                    foreach ($children as $key => $value) {
                        array_push($ids, $value);
                    }
                }
                array_push($ids, $item['id']);
            }
        }
        return $ids;


    }

    /** Delete tree and branch items
     * @param Collection $items
     * @param integer|null $id
     */
    public static function deleteTree($items, $id = null)
    {
        foreach ($items as $item) {
            if ($item['parent_id'] == $id) {
                $children = self::getTree($items, $item['id']);
                if ($children) {
                    foreach ($children as $key => $value) {
                        $value->delete();
                    }
                }
                $item->delete();
            }
        }

    }
}