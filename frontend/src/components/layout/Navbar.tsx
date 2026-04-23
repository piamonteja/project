import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Clapperboard, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useMovieStore } from "@/store/movieStore";
import type { NavigationItem } from "@/types/ui";

const navigationItems: NavigationItem[] = [
    { label: "Browse", to: "/" },
    { label: "Watchlist", to: "/watchlist" },
];

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const searchMovies = useMovieStore((state) => state.searchMovies);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchMovies(searchQuery);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-10">
            <nav className="mx-auto max-w-7xl rounded-[1.5rem] border border-border/60 bg-background/78 px-4 py-3 shadow-lg shadow-primary/5 backdrop-blur-xl sm:px-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 lg:gap-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                                <Clapperboard className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                                        FilmStack
                                    </span>
                                </div>
                                <p className="hidden text-xs text-muted-foreground sm:block">
                                    Discover films with depth and clarity
                                </p>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-secondary/50 p-1 md:flex">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        [
                                            "rounded-full px-4 py-2 text-sm font-medium transition",
                                            isActive
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground",
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <form onSubmit={handleSearch} className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search titles, genres, casts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-72 rounded-full border border-border/60 bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40"
                            />
                        </form>

                        

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((current) => !current)}
                            className="inline-flex items-center justify-center rounded-full border border-border/60 bg-secondary/60 p-2.5 md:hidden"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="mt-4 rounded-[1.5rem] border border-border/60 bg-card/95 p-4 shadow-lg md:hidden">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search your next film..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-border/60 bg-secondary/60 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary/40"
                            />
                        </form>

                        <div className="mt-4 grid gap-2">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        [
                                            "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary/50 text-foreground",
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                    <Sparkles className="w-4 h-4" />
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
