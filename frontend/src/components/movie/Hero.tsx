import { Play, Plus, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import WatchlistAction from "@/components/movie/WatchlistAction";
import type { HeroProps } from "@/types/ui";

const Hero = ({ movie }: HeroProps) => {
    if (!movie) return (
        <section className="px-4 pt-4 sm:px-6 lg:px-10">
            <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 px-6 py-16 shadow-lg">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_35%)] opacity-10" />
                <p className="relative animate-pulse text-muted-foreground">Loading spotlight...</p>
            </div>
        </section>
    );

    return (
        <section className="px-4 pt-4 sm:px-6 lg:px-10">
        <div className="relative min-h-[78vh] overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-2xl shadow-primary/10">
            {/* Backdrop Image */}
            <div className="absolute inset-0">
                <img 
                    src={movie.backdrop_url || movie.poster_url || ""} 
                    alt={movie.title || ""} 
                    className="h-full w-full object-cover"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/15"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_28%)] opacity-30" />
            </div>

            {/* Content */}
            <div className="relative flex min-h-[78vh] flex-col justify-end px-6 py-10 sm:px-8 lg:px-12">
                <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_320px]">
                    <div className="flex max-w-3xl flex-col gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-primary/20 bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
                                Spotlight pick
                            </span>
                            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-background/55 px-3 py-1.5 text-sm font-semibold text-foreground/90 backdrop-blur-md">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{movie.vote_average?.toFixed(1) || "0.0"}</span>
                            </div>
                            <div className="rounded-full border border-border/70 bg-background/55 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-md">
                                {movie.release_date || "Upcoming"}
                            </div>
                        </div>

                        <h1 className="max-w-3xl font-serif text-4xl leading-none text-foreground sm:text-5xl lg:text-7xl">
                            {movie.title}
                        </h1>

                        <p className="max-w-2xl text-sm leading-7 text-foreground/78 sm:text-base lg:text-lg">
                            {movie.overview}
                        </p>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                            <Link 
                                to={`/movie/${movie.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90 sm:px-7"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Explore details
                            </Link>
                            <WatchlistAction movieId={movie.id} movieTitle={movie.title}>
                                {({ inWatchlist, openDialog }) => (
                                    <button 
                                        onClick={openDialog}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background sm:px-7"
                                    >
                                        {inWatchlist ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                In Watchlist
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />
                                                Add to Watchlist
                                            </>
                                        )}
                                    </button>
                                )}
                            </WatchlistAction>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-auto w-full max-w-[300px] rounded-[1.75rem] border border-white/15 bg-background/70 p-4 shadow-2xl backdrop-blur-xl">
                            <div className="overflow-hidden rounded-[1.25rem]">
                                <img
                                    src={movie.poster_url || movie.backdrop_url || ""}
                                    alt={movie.title || ""}
                                    className="aspect-[2/3] w-full object-cover"
                                />
                            </div>
                            <div className="space-y-3 px-1 pb-1 pt-4">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                                    FilmStack preview
                                </p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{movie.runtime ? `${movie.runtime} min` : "Runtime TBA"}</span>
                                    <span>{movie.genres[0] || "Feature film"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Hero;
