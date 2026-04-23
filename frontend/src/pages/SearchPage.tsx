import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Search as SearchIcon, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMovieStore } from "@/store/movieStore";
import MovieCard from "@/components/movie/MovieCard";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const { movies, searchMovies, searchLoading, error } = useMovieStore();

    useEffect(() => {
        if (query) {
            searchMovies(query);
        }
    }, [query, searchMovies]);

    return (
        <div className="min-h-[70vh] px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm shadow-primary/5 sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                                <Sparkles className="w-3.5 h-3.5" />
                                Film search
                            </div>
                            <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
                                {query ? `Search results for "${query}"` : "Explore Movies"}
                            </h1>
                            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                Found {movies.length} results{query ? ` for ${query}` : ""}.
                            </p>
                        </div>
                       
                    </div>
                </section>

                {searchLoading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 rounded-[1.5rem] border border-border/60 bg-card/70 p-3">
                                <div className="aspect-[2/3] w-full rounded-[1.15rem] bg-secondary animate-pulse" />
                                <div className="h-4 w-3/4 rounded bg-secondary animate-pulse" />
                                <div className="h-3 w-1/4 rounded bg-secondary animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-destructive/20 bg-destructive/5 px-6 py-20 text-center">
                        <div className="rounded-full bg-destructive/10 p-6">
                            <SearchIcon className="w-12 h-12 text-destructive" />
                        </div>
                        <h2 className="text-xl font-semibold">Something went wrong</h2>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/60 bg-card/70 px-6 py-20 text-center">
                        <div className="rounded-full bg-secondary p-6">
                            <SearchIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">No results found</h2>
                        <p className="text-muted-foreground">Try searching for something else</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
