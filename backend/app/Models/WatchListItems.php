<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchListItems extends Model
{
     protected $fillable = [
        'tmdb_id',
        'title',
        'poster_path',
        'release_date',
    ];

    protected $casts = [
        'release_date' => 'date',
    ];
}
