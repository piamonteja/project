import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { MovieDetails, MovieSearchItem } from "@/types/movie";

export const movieService = {
    async searchMovies(query: string): Promise<MovieSearchItem[]> {
        const response = await api.get<ApiResponse<MovieSearchItem[]>>("/movies/search", {
            params: { q: query },
        });

        return response.data.data;
    },

    async getTopRatedMovies(): Promise<MovieSearchItem[]> {
        const response = await api.get<ApiResponse<MovieSearchItem[]>>("/movies/top-rated");
        return response.data.data;
    },

    async getTopRatedTv(): Promise<MovieSearchItem[]> {
        const response = await api.get<ApiResponse<MovieSearchItem[]>>("/tv/top-rated");
        return response.data.data;
    },

    async getMovieDetails(id: number): Promise<MovieDetails> {
        const response = await api.get<ApiResponse<MovieDetails>>(`/movies/${id}`);
        return response.data.data;
    },
};
