export type MovieSearchItem = {
    id: number;
    title: string | null;
    year: string | null;
    poster_path: string | null;
    poster_url: string | null;
    release_date: string | null;
    vote_average?: number | null;
    media_type?: "movie" | "tv";
};

export type CastMember = {
    id: number;
    name: string | null;
    character: string | null;
    profile_path: string | null;
};

export type MovieDetails = {
    id: number;
    title: string | null;
    overview: string | null;
    genres: string[];
    runtime: number | null;
    release_date: string | null;
    vote_average: number | null;
    vote_count: number | null;
    poster_path: string | null;
    poster_url: string | null;
    backdrop_path: string | null;
    backdrop_url: string | null;
    cast: CastMember[];
};
