import { Outlet } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-primary/12 blur-3xl sm:h-96 sm:w-96" />
                <div className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full bg-accent/40 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
                <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),transparent)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />
            </div>

            <Navbar />

            <main className="pt-28 sm:pt-32">
                <Outlet />
            </main>

            <Toaster position="top-right" richColors />

            <footer className="mt-20 px-4 pb-10 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/60 bg-card/75 px-6 py-8 shadow-lg shadow-primary/5 backdrop-blur-md sm:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                                    <Clapperboard className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold tracking-tight">FilmStack</p>
                                    <p className="text-sm text-muted-foreground">
                                        Your modern film discovery workspace.
                                    </p>
                                </div>
                            </div>
                            
                        </div>

                        
                    </div>

                    <div className="mt-8 border-t border-border/60 pt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        © 2026 FilmStack. Built for focused movie discovery.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
