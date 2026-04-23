import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Layers3, Sparkles, BookmarkPlus } from "lucide-react";
import { useMovieStore } from "@/store/movieStore";
import Hero from "@/components/movie/Hero";
import MovieCard from "@/components/movie/MovieCard";
import MediaCarousel from "@/components/movie/MediaCarousel";

const HomePage = () => {
    const {
        movies,
        topRatedMovies,
        topRatedTv,
        searchMovies,
        fetchTopRated,
        fetchMovieDetails,
        searchLoading,
        carouselLoading,
    } = useMovieStore();
    const selectedMovie = useMovieStore((state) => state.selectedMovie);

    useEffect(() => {
        const loadHomeData = async () => {
            const [results] = await Promise.all([
                searchMovies("Avatar"),
                fetchTopRated(),
            ]);

            if (results.length > 0 && !useMovieStore.getState().selectedMovie) {
                await fetchMovieDetails(results[0].id);
            }
        };

        loadHomeData();
    }, [fetchMovieDetails, fetchTopRated, searchMovies]);

    const genres = ["Sci-Fi", "Action", "Thriller", "Adventure", "Animation"];
    const highlights = [
        {
            icon: Layers3,
            title: "Layered discovery",
            description: "Browse cinematic picks with cleaner hierarchy and clearer metadata.",
        },
        {
            icon: Sparkles,
            title: "Editorial focus",
            description: "Spotlight sections guide attention toward a featured film experience.",
        },
        {
            icon: BookmarkPlus,
            title: "Watchlist flow",
            description: "Save titles with confirmation, toasts, and a more polished interaction model.",
        },
    ];

    return (
        <div className="flex flex-col gap-12 pb-20">
            <Hero movie={selectedMovie} />

            <section className="px-4 sm:px-6 lg:px-10">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
                    {highlights.map(({ icon: Icon, title, description }) => (
                        <article
                            key={title}
                            className="rounded-[1.75rem] border border-border/60 bg-card/75 p-6 shadow-sm shadow-primary/5 backdrop-blur-md"
                        >
                            <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                                <Icon className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                                Discover
                            </p>
                            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                                Popular results, refined for quick scanning
                            </h2>
                            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                A denser layout for browsing on desktop, with enough breathing room to stay readable on phones and tablets.
                            </p>
                        </div>
                        <Link
                            to="/search"
                            className="inline-flex items-center gap-1 self-start rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
                        >
                            View all films <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                className="rounded-full border border-border/60 bg-secondary/70 px-4 py-2 text-xs font-semibold text-secondary-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    {searchLoading ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] w-full rounded-[1.5rem] bg-secondary animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                            {movies.slice(0, 12).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <MediaCarousel
                title="Top Rated Movies"
                subtitle="Critically loved films."
                items={topRatedMovies}
                loading={carouselLoading}
            />

            <MediaCarousel
                title="Top Rated TV"
                subtitle="Prestige TV and fan-favorite series."
                items={topRatedTv}
                loading={carouselLoading}
            />

            <section className="px-4 sm:px-6 lg:px-10">
                <div className="relative mx-auto overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-lg shadow-primary/5 sm:p-10 lg:max-w-7xl lg:p-12">
                    <div className="absolute right-[-8%] top-[-20%] h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div className="relative z-10 max-w-2xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                                Build your personal stack
                            </p>
                            <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
                                Keep every must-watch film in one clean watchlist.
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                                Save titles as you browse, revisit them later, and keep your discovery flow uninterrupted across devices and screen sizes.
                            </p>
                            <Link
                                to="/watchlist"
                                className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90"
                            >
                                Open watchlist
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-border/60 bg-background/75 p-5">
                                <p className="text-3xl font-semibold">12+</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Responsive cards visible above the fold on wide screens.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-border/60 bg-background/75 p-5">
                                <p className="text-3xl font-semibold">1 tap</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Confirmation before saving or deleting watchlist items.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
