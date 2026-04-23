import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { WatchlistItem } from "@/types/watchlist";

export const watchlistService = {
    async getWatchlist(): Promise<WatchlistItem[]> {
        const response = await api.get<ApiResponse<WatchlistItem[]>>("/watchlist");
        return response.data.data;
    },

    async addToWatchlist(tmdbId: number): Promise<WatchlistItem> {
        const response = await api.post<ApiResponse<WatchlistItem>>("/watchlist", {
            tmdb_id: tmdbId,
        });

        return response.data.data;
    },

    async removeFromWatchlist(tmdbId: number): Promise<void> {
        await api.delete(`/watchlist/${tmdbId}`);
    },

    async checkWatchlist(tmdbId: number): Promise<boolean> {
        const response = await api.get<ApiResponse<{ exists: boolean }>>(
            `/watchlist/check/${tmdbId}`
        );

        return response.data.data.exists;
    },
};