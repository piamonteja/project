import type { ComponentProps, ReactNode } from "react";
import type { MovieDetails, MovieSearchItem } from "@/types/movie";

export type ButtonSize =
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";

export type NavigationItem = {
    label: string;
    to: string;
};

export type MovieCardProps = {
    movie: MovieSearchItem;
    className?: string;
};

export type MediaCarouselProps = {
    title: string;
    subtitle: string;
    items: MovieSearchItem[];
    loading?: boolean;
};

export type HeroProps = {
    movie: MovieDetails | null;
};

export type WatchlistActionRenderProps = {
    inWatchlist: boolean;
    pending: boolean;
    openDialog: () => void;
};

export type WatchlistActionProps = {
    movieId: number;
    movieTitle: string | null;
    children: (props: WatchlistActionRenderProps) => ReactNode;
};

export type PaginationLinkProps = {
    isActive?: boolean;
    size?: ButtonSize;
} &
    ComponentProps<"a">;

export type PaginationArrowProps = PaginationLinkProps & {
    text?: string;
};
