<?php

namespace App\Services;

use App\Models\WatchListItems;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class WatchlistService
{
    public function __construct(
        protected TmdbService $tmdbService
    ) {}

    public function getAll(): Collection
    {
        return WatchListItems::query()
            ->latest()
            ->get();
    }

    public function add(int $tmdbId): WatchListItems
    {
        $movie = $this->tmdbService->getMovieDetails($tmdbId);

        return WatchListItems::firstOrCreate(
            [
                'tmdb_id' => $movie['id'],
            ],
            [
                'title' => $movie['title'],
                'poster_path' => $movie['poster_path'],
                'release_date' => $movie['release_date'],
            ]
        );
    }

    public function remove(int $tmdbId): void
    {
        $deleted = WatchListItems::query()
            ->where('tmdb_id', $tmdbId)
            ->delete();

        if (! $deleted) {
            throw new NotFoundHttpException('Movie not found in watchlist.');
        }
    }

    public function exists(int $tmdbId): bool
    {
        return WatchListItems::query()
            ->where('tmdb_id', $tmdbId)
            ->exists();
    }
}