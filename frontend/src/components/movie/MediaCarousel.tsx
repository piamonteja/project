import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import type { MediaCarouselProps } from "@/types/ui";

const MediaCarousel = ({ title, subtitle, items, loading = false }: MediaCarouselProps) => {
    const trackRef = useRef<HTMLDivElement | null>(null);

    const scrollByOffset = (direction: "left" | "right") => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const offset = direction === "left" ? -track.clientWidth * 0.8 : track.clientWidth * 0.8;

        track.scrollBy({
            left: offset,
            behavior: "smooth",
        });
    };

    return (
        <section className="px-4 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>
                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                        <button
                            type="button"
                            onClick={() => scrollByOffset("left")}
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground transition hover:border-primary/30 hover:text-primary"
                            aria-label={`Scroll ${title} left`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByOffset("right")}
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground transition hover:border-primary/30 hover:text-primary"
                            aria-label={`Scroll ${title} right`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {loading
                        ? [...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className="h-[22rem] min-w-[12rem] animate-pulse rounded-[1.5rem] bg-secondary sm:min-w-[13rem]"
                            />
                        ))
                        : items.map((item) => {
                            const isMovie = item.media_type !== "tv";
                            const content = (
                                <>
                                    <div className="relative aspect-[2/3] overflow-hidden rounded-[1.1rem] bg-secondary">
                                        {item.poster_url ? (
                                            <img
                                                src={item.poster_url}
                                                alt={item.title || title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
                                                Poster unavailable
                                            </div>
                                        )}
                                        <div className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
                                            {item.media_type === "tv" ? "TV" : "Movie"}
                                        </div>
                                    </div>
                                    <div className="space-y-2 px-1 pb-1 pt-3">
                                        <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                                            <span>{item.year || "N/A"}</span>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-secondary-foreground">
                                                <Star className="w-3 h-3 fill-current text-primary" />
                                                {item.vote_average?.toFixed(1) || "0.0"}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            );

                            if (isMovie) {
                                return (
                                    <Link
                                        key={`${item.media_type ?? "movie"}-${item.id}`}
                                        to={`/movie/${item.id}`}
                                        className="group min-w-[12rem] snap-start rounded-[1.5rem] border border-border/60 bg-card/75 p-2 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:min-w-[13rem]"
                                    >
                                        {content}
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={`${item.media_type ?? "movie"}-${item.id}`}
                                    className="group min-w-[12rem] snap-start rounded-[1.5rem] border border-border/60 bg-card/75 p-2 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:min-w-[13rem]"
                                >
                                    {content}
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default MediaCarousel;
