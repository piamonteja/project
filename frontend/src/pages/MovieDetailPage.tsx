import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Star, Clock, Calendar, Plus, Check, Play, User } from "lucide-react";
import { useMovieStore } from "@/store/movieStore";
import { cn } from "@/lib/utils";
import WatchlistAction from "@/components/movie/WatchlistAction";

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedMovie, fetchMovieDetails, detailsLoading, error, clearSelectedMovie } = useMovieStore();

    useEffect(() => {
        if (id) {
            fetchMovieDetails(parseInt(id));
        }
        return () => clearSelectedMovie();
    }, [id, fetchMovieDetails, clearSelectedMovie]);

    if (detailsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !selectedMovie) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold">Movie not found</h2>
                <p className="text-muted-foreground">{error || "The movie details could not be loaded."}</p>
            </div>
        );
    }

    return (
        <div className="relative pb-20">
            <div className="relative mx-4 overflow-hidden rounded-[2rem] border border-border/60 shadow-2xl shadow-primary/10 sm:mx-6 lg:mx-10">
                <div className="relative h-[56vh] w-full sm:h-[62vh]">
                    <div className="absolute inset-0">
                        <img
                            src={selectedMovie.backdrop_url || selectedMovie.poster_url || ""}
                            alt={selectedMovie.title || ""}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/15" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 px-6 pb-8 sm:px-8 lg:flex-row lg:items-end lg:px-12 lg:pb-12">
                        <div className="mx-auto hidden w-56 shrink-0 overflow-hidden rounded-[1.5rem] border-4 border-background shadow-2xl lg:mx-0 lg:block lg:w-64 lg:-mb-20">
                            <img src={selectedMovie.poster_url || ""} alt={selectedMovie.title || ""} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-1 flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-primary/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                                        FilmStack details
                                    </span>
                                </div>
                                <h1 className="font-serif text-4xl leading-none sm:text-5xl lg:text-6xl">
                                    {selectedMovie.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 pt-2 text-sm font-medium">
                                    <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-yellow-500 backdrop-blur-md">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>{selectedMovie.vote_average?.toFixed(1)}</span>
                                        <span className="ml-1 text-muted-foreground">({selectedMovie.vote_count} votes)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-muted-foreground backdrop-blur-md">
                                        <Clock className="w-4 h-4" />
                                        <span>{selectedMovie.runtime} min</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-muted-foreground backdrop-blur-md">
                                        <Calendar className="w-4 h-4" />
                                        <span>{selectedMovie.release_date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90">
                                    <Play className="w-5 h-5 fill-current" />
                                    Play Trailer
                                </button>
                                <WatchlistAction movieId={selectedMovie.id} movieTitle={selectedMovie.title}>
                                    {({ inWatchlist, openDialog }) => (
                                        <button
                                            onClick={openDialog}
                                            className={cn(
                                                "inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition hover:-translate-y-0.5",
                                                inWatchlist
                                                    ? "border-primary/30 bg-primary/10 text-primary"
                                                    : "border-white/20 bg-background/20 text-white hover:bg-background/35"
                                            )}
                                        >
                                            {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                            {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
                                        </button>
                                    )}
                                </WatchlistAction>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_340px] lg:px-10">
                <div className="flex flex-col gap-8">
                    <section className="rounded-[1.75rem] border border-border/60 bg-card/80 p-6 shadow-sm sm:p-8">
                        <h2 className="mb-4 font-serif text-2xl">Overview</h2>
                        <p className="text-sm leading-8 text-muted-foreground sm:text-base">
                            {selectedMovie.overview}
                        </p>
                    </section>

                    <section className="rounded-[1.75rem] border border-border/60 bg-card/80 p-6 shadow-sm sm:p-8">
                        <h2 className="mb-6 font-serif text-2xl">Cast</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                            {selectedMovie.cast.slice(0, 8).map((person) => (
                                <div key={person.id} className="group rounded-[1.5rem] border border-border/60 bg-background/75 p-4 transition hover:border-primary/20 hover:shadow-md">
                                    <div className="mx-auto aspect-square w-24 overflow-hidden rounded-full border-2 border-transparent bg-secondary transition-all group-hover:border-primary sm:w-28">
                                        {person.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className="line-clamp-1 text-sm font-semibold">{person.name}</p>
                                        <p className="line-clamp-1 text-xs text-muted-foreground">{person.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="flex flex-col gap-6">
                    <section className="rounded-[1.75rem] border border-border/60 bg-card/80 p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Details</h3>
                        <dl className="flex flex-col gap-4">
                            <div>
                                <dt className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Status</dt>
                                <dd className="text-sm font-medium">Released</dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Genres</dt>
                                <dd className="flex flex-wrap gap-2 pt-1">
                                    {selectedMovie.genres.map((genre) => (
                                        <span key={genre} className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold">
                                            {genre}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Release Date</dt>
                                <dd className="text-sm font-medium">{selectedMovie.release_date}</dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Runtime</dt>
                                <dd className="text-sm font-medium">{selectedMovie.runtime} minutes</dd>
                            </div>
                        </dl>
                    </section>

                    <section className="rounded-[1.75rem] border border-border/60 bg-primary/8 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Why save it?</p>
                        <h3 className="mt-3 text-xl font-semibold">Keep this title inside your FilmStack queue.</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Watchlist actions now use confirmation dialogs and feedback toasts so saving feels intentional and safe.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
