import { create } from "zustand";
import type { WatchlistItem } from "@/types/watchlist";
import { watchlistService } from "@/services/watchListService";
import { getErrorMessage } from "@/lib/message";


type WatchlistState = {
    items: WatchlistItem[];
    loading: boolean;
    error: string | null;
    fetchWatchlist: () => Promise<void>;
    addToWatchlist: (tmdbId: number) => Promise<boolean>;
    removeFromWatchlist: (tmdbId: number) => Promise<boolean>;
    isInWatchlist: (tmdbId: number) => boolean;
};

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
    items: [],
    loading: false,
    error: null,

    fetchWatchlist: async () => {
        try {
            set({ loading: true, error: null });

            const items = await watchlistService.getWatchlist();

            set({ items });
        } catch (error) {
            set({
                error: getErrorMessage(error, "Failed to load watchlist."),
            });
        } finally {
            set({ loading: false });
        }
    },

    addToWatchlist: async (tmdbId) => {
        try {
            set({ error: null });
            const item = await watchlistService.addToWatchlist(tmdbId);

            set((state) => {
                const exists = state.items.some((movie) => movie.tmdb_id === item.tmdb_id);

                if (exists) return state;

                return { items: [item, ...state.items] };
            });
            return true;
        } catch (error) {
            set({
                error: getErrorMessage(error, "Failed to add movie to watchlist."),
            });
            return false;
        }
    },

    removeFromWatchlist: async (tmdbId) => {
        try {
            set({ error: null });
            await watchlistService.removeFromWatchlist(tmdbId);

            set((state) => ({
                items: state.items.filter((movie) => movie.tmdb_id !== tmdbId),
            }));
            return true;
        } catch (error) {
            set({
                error: getErrorMessage(error, "Failed to remove movie from watchlist."),
            });
            return false;
        }
    },

    isInWatchlist: (tmdbId) => {
        return get().items.some((movie) => movie.tmdb_id === tmdbId);
    },
}));
