<?php

namespace App\Http\Controllers;

use App\Models\WatchListItems;
use App\Services\WatchlistService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreWatchListItemsRequest;
use App\Http\Requests\UpdateWatchListItemsRequest;

class WatchListItemsController extends Controller
{
    public function __construct(
        protected WatchlistService $watchlistService
    ) {}

    public function index(): JsonResponse
    {
        $items = $this->watchlistService->getAll();

        return response()->json([
            'data' => $items,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tmdb_id' => ['required', 'integer'],
        ]);

        $item = $this->watchlistService->add($validated['tmdb_id']);

        return response()->json([
            'message' => 'Movie added to watchlist.',
            'data' => $item,
        ], 201);
    }

    public function destroy(int $tmdbId): JsonResponse
    {
        try {
            $this->watchlistService->remove($tmdbId);

            return response()->json([
                'message' => 'Movie removed from watchlist.',
            ]);
        } catch (NotFoundHttpException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 404);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to remove movie from watchlist.',
            ], 500);
        }
    }

    public function check(int $tmdbId): JsonResponse
    {
        $exists = $this->watchlistService->exists($tmdbId);

        return response()->json([
            'data' => [
                'exists' => $exists,
            ],
        ]);
    }
}
