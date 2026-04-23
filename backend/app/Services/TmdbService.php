<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class TmdbService
{
    protected string $baseUrl;
    protected string $token;
    protected string $imageBaseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.tmdb.base_url');
        $this->token = config('services.tmdb.token');
        $this->imageBaseUrl = config('services.tmdb.image_base_url');
    }

    protected function client()
    {
        return Http::baseUrl($this->baseUrl)
            ->acceptJson()
            ->withToken($this->token)
            ->timeout(10);
    }

    protected function transformMediaItem(array $item, string $mediaType): array
    {
        $releaseDate = $mediaType === 'tv'
            ? ($item['first_air_date'] ?? null)
            : ($item['release_date'] ?? null);

        return [
            'id' => $item['id'],
            'title' => $mediaType === 'tv'
                ? ($item['name'] ?? null)
                : ($item['title'] ?? null),
            'year' => ! empty($releaseDate)
                ? substr($releaseDate, 0, 4)
                : null,
            'poster_path' => $item['poster_path'] ?? null,
            'poster_url' => ! empty($item['poster_path'])
                ? $this->imageBaseUrl . $item['poster_path']
                : null,
            'release_date' => $releaseDate,
            'vote_average' => $item['vote_average'] ?? null,
            'media_type' => $mediaType,
        ];
    }

    /**
     * @throws RequestException
     */
    public function searchMovies(string $query): array
    {
        $response = $this->client()
            ->get('/search/movie', [
                'query' => $query,
                'include_adult' => false,
                'language' => 'en-US',
                'page' => 1,
            ])
            ->throw();

        return collect($response->json('results', []))
            ->map(fn (array $movie) => $this->transformMediaItem($movie, 'movie'))
            ->values()
            ->all();
    }

    /**
     * @throws RequestException
     */
    public function getTopRatedMovies(): array
    {
        $response = $this->client()
            ->get('/movie/top_rated', [
                'language' => 'en-US',
                'page' => 1,
            ])
            ->throw();

        return collect($response->json('results', []))
            ->map(fn (array $movie) => $this->transformMediaItem($movie, 'movie'))
            ->values()
            ->all();
    }

    /**
     * @throws RequestException
     */
    public function getTopRatedTv(): array
    {
        $response = $this->client()
            ->get('/tv/top_rated', [
                'language' => 'en-US',
                'page' => 1,
            ])
            ->throw();

        return collect($response->json('results', []))
            ->map(fn (array $show) => $this->transformMediaItem($show, 'tv'))
            ->values()
            ->all();
    }

    /**
     * @throws RequestException
     */
    public function getMovieDetails(int $movieId): array
    {
        $response = $this->client()
            ->get("/movie/{$movieId}", [
                'language' => 'en-US',
                'append_to_response' => 'credits',
            ])
            ->throw();

        $movie = $response->json();

        return [
            'id' => $movie['id'],
            'title' => $movie['title'] ?? null,
            'overview' => $movie['overview'] ?? null,
            'genres' => collect($movie['genres'] ?? [])
                ->pluck('name')
                ->values()
                ->all(),
            'runtime' => $movie['runtime'] ?? null,
            'release_date' => $movie['release_date'] ?? null,
            'vote_average' => $movie['vote_average'] ?? null,
            'vote_count' => $movie['vote_count'] ?? null,
            'poster_path' => $movie['poster_path'] ?? null,
            'poster_url' => ! empty($movie['poster_path'])
                ? $this->imageBaseUrl . $movie['poster_path']
                : null,
            'backdrop_path' => $movie['backdrop_path'] ?? null,
            'backdrop_url' => ! empty($movie['backdrop_path'])
                ? $this->imageBaseUrl . $movie['backdrop_path']
                : null,
            'cast' => collect($movie['credits']['cast'] ?? [])
                ->take(10)
                ->map(fn (array $person) => [
                    'id' => $person['id'],
                    'name' => $person['name'] ?? null,
                    'character' => $person['character'] ?? null,
                    'profile_path' => $person['profile_path'] ?? null,
                ])
                ->values()
                ->all(),
        ];
    }
}
