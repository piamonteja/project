<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class MovieController extends Controller
{
    public function __construct(
        protected TmdbService $tmdbService
    ) {}

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'max:255'],
        ]);

        try {
            $movies = $this->tmdbService->searchMovies($validated['q']);

            return response()->json([
                'data' => $movies,
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to fetch movies right now.',
            ], 502);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $movie = $this->tmdbService->getMovieDetails($id);

            return response()->json([
                'data' => $movie,
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to fetch movie details right now.',
            ], 502);
        }
    }

    public function topRatedMovies(): JsonResponse
    {
        try {
            return response()->json([
                'data' => $this->tmdbService->getTopRatedMovies(),
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to fetch top rated movies right now.',
            ], 502);
        }
    }

    public function topRatedTv(): JsonResponse
    {
        try {
            return response()->json([
                'data' => $this->tmdbService->getTopRatedTv(),
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to fetch top rated TV shows right now.',
            ], 502);
        }
    }
}
