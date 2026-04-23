import { useEffect } from "react";
import { BookmarkPlus, Clapperboard, Trash2 } from "lucide-react";
import { useWatchlistStore } from "@/store/watchListStore";
import MovieCard from "@/components/movie/MovieCard";
import WatchlistAction from "@/components/movie/WatchlistAction";
import type { MovieSearchItem } from "@/types/movie";

const WatchListPage = () => {
    const { items, fetchWatchlist, loading } = useWatchlistStore();

    useEffect(() => {
        fetchWatchlist();
    }, [fetchWatchlist]);

    const watchlistMovies: MovieSearchItem[] = items.map((item) => ({
        id: item.tmdb_id,
        title: item.title,
        year: item.release_date ? item.release_date.slice(0, 4) : null,
        poster_path: item.poster_path,
        poster_url: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        release_date: item.release_date,
    }));

    return (
        <div className="min-h-[70vh] px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm shadow-primary/5 sm:p-8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                                <BookmarkPlus className="w-3.5 h-3.5" />
                                Personal queue
                            </div>
                            <h1 className="font-serif text-3xl leading-tight sm:text-4xl">My Watchlist</h1>
                            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                {items.length} movies saved for later
                            </p>
                        </div>
                        <div className="rounded-[1.5rem] border border-border/60 bg-background/80 px-5 py-4">
                            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Saved titles</p>
                            <p className="mt-1 text-3xl font-semibold">{items.length}</p>
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] w-full rounded-[1.5rem] bg-secondary animate-pulse" />
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                        {watchlistMovies.map((movie) => (
                            <div key={movie.id} className="relative group">
                                <MovieCard movie={movie} />
                                <WatchlistAction movieId={movie.id} movieTitle={movie.title}>
                                    {({ openDialog }) => (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                openDialog();
                                            }}
                                            className="absolute bottom-20 right-4 rounded-full border border-destructive/10 bg-destructive p-2 text-white opacity-100 shadow-lg transition hover:scale-105"
                                            title="Remove from watchlist"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </WatchlistAction>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 rounded-[2rem] border border-border/60 bg-card/70 px-6 py-24 text-center sm:py-32">
                        <div className="rounded-full bg-secondary p-8">
                            <Clapperboard className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <div className="max-w-md flex flex-col gap-2">
                            <h2 className="font-serif text-2xl">Your watchlist is empty</h2>
                            <p className="text-sm text-muted-foreground">
                                Start exploring movies and add them to your watchlist to keep track of what you want to watch.
                            </p>
                        </div>
                        <a href="/" className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90">
                            Browse Movies
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchListPage;
