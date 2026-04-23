import { Link } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import WatchlistAction from "@/components/movie/WatchlistAction";
import type { MovieCardProps } from "@/types/ui";

const MovieCard = ({ movie, className }: MovieCardProps) => {
    return (
        <Link 
            to={`/movie/${movie.id}`}
            className={cn(
                "group relative flex h-full flex-col gap-3 rounded-[1.5rem] border border-border/60 bg-card/70 p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
                className
            )}
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.15rem] bg-secondary">
                {movie.poster_url ? (
                    <img 
                        src={movie.poster_url} 
                        alt={movie.title || "Movie poster"} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted p-4 text-center text-xs text-muted-foreground">
                        No Poster Available
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-md">
                    {movie.year || "New"}
                </div>
                
                <WatchlistAction movieId={movie.id} movieTitle={movie.title}>
                    {({ inWatchlist, openDialog }) => (
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openDialog();
                            }}
                            className="absolute right-3 top-3 rounded-full border border-white/15 bg-background/75 p-2 text-foreground shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-background"
                            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                        >
                            {inWatchlist ? (
                                <Check className="w-4 h-4 text-primary" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </WatchlistAction>
            </div>
            
            <div className="flex flex-1 flex-col justify-between gap-3 px-1 pb-1">
                <div className="space-y-1">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-tight transition-colors group-hover:text-primary sm:text-base">
                        {movie.title}
                    </h3>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="line-clamp-1">{movie.release_date || "Release date unavailable"}</span>
                    <span className="rounded-full bg-secondary px-2 py-1 font-medium text-secondary-foreground">
                        Details
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
