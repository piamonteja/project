<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\WatchListItemsController;
use Illuminate\Support\Facades\Route;

Route::get('/movies/search', [MovieController::class, 'search']);
Route::get('/movies/top-rated', [MovieController::class, 'topRatedMovies']);
Route::get('/tv/top-rated', [MovieController::class, 'topRatedTv']);
Route::get('/movies/{id}', [MovieController::class, 'show']);

Route::get('/watchlist', [WatchListItemsController::class, 'index']);
Route::post('/watchlist', [WatchListItemsController::class, 'store']);
Route::delete('/watchlist/{tmdbId}', [WatchListItemsController::class, 'destroy']);
Route::get('/watchlist/check/{tmdbId}', [WatchListItemsController::class, 'check']);
