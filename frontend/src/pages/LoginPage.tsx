import { Film, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-lg shadow-primary/5 sm:p-10">
                    <div className="absolute right-[-10%] top-[-10%] h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
                    <div className="relative max-w-xl space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                            <Film className="w-3.5 h-3.5" />
                            Welcome back
                        </div>
                        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                            Sign in to continue building your FilmStack.
                        </h1>
                        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                            Save favorites, track your next watch, and keep your movie discovery flow organized in one place.
                        </p>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-border/60 bg-background/85 p-6 shadow-lg sm:p-8">
                    <div className="space-y-5">
                        <div>
                            <h2 className="text-2xl font-semibold">Login</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                A polished placeholder screen until authentication is wired up.
                            </p>
                        </div>

                        <label className="block space-y-2">
                            <span className="text-sm font-medium">Email</span>
                            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                />
                            </div>
                        </label>

                        <label className="block space-y-2">
                            <span className="text-sm font-medium">Password</span>
                            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3">
                                <LockKeyhole className="w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                />
                            </div>
                        </label>

                        <button className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90">
                            Continue to FilmStack
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
