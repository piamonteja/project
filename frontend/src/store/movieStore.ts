import { create } from "zustand";
import { movieService } from "@/services/movieService";
import type { MovieDetails, MovieSearchItem } from "@/types/movie";
import { getErrorMessage } from "@/lib/message";

type MovieState = {
    movies: MovieSearchItem[];
    topRatedMovies: MovieSearchItem[];
    topRatedTv: MovieSearchItem[];
    selectedMovie: MovieDetails | null;
    searchLoading: boolean;
    carouselLoading: boolean;
    detailsLoading: boolean;
    error: string | null;
    searchMovies: (query: string) => Promise<MovieSearchItem[]>;
    fetchTopRated: () => Promise<void>;
    fetchMovieDetails: (id: number) => Promise<void>;
    clearSelectedMovie: () => void;
};

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    topRatedMovies: [],
    topRatedTv: [],
    selectedMovie: null,
    searchLoading: false,
    carouselLoading: false,
    detailsLoading: false,
    error: null,

    searchMovies: async (query) => {
        if (!query.trim()) {
            set({ movies: [], error: null });
            return [];
        }

        try {
            set({ searchLoading: true, error: null });

            const movies = await movieService.searchMovies(query);

            set({ movies });
            return movies;
        } catch (error) {
            set({
                movies: [],
                error: getErrorMessage(error, "Failed to search movies."),
            });
            return [];
        } finally {
            set({ searchLoading: false });
        }
    },

    fetchTopRated: async () => {
        try {
            set({ carouselLoading: true, error: null });

            const [topRatedMovies, topRatedTv] = await Promise.all([
                movieService.getTopRatedMovies(),
                movieService.getTopRatedTv(),
            ]);

            set({ topRatedMovies, topRatedTv });
        } catch (error) {
            set({
                topRatedMovies: [],
                topRatedTv: [],
                error: getErrorMessage(error, "Failed to load top rated titles."),
            });
        } finally {
            set({ carouselLoading: false });
        }
    },

    fetchMovieDetails: async (id) => {
        try {
            set({ detailsLoading: true, error: null });

            const movie = await movieService.getMovieDetails(id);

            set({ selectedMovie: movie });
        } catch (error) {
            set({
                selectedMovie: null,
                error: getErrorMessage(error, "Failed to load movie details."),
            });
        } finally {
            set({ detailsLoading: false });
        }
    },

    clearSelectedMovie: () => set({ selectedMovie: null }),
}));
