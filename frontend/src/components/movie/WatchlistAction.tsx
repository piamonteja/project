import { useState } from "react";
import { toast } from "sonner";
import { useWatchlistStore } from "@/store/watchListStore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { WatchlistActionProps } from "@/types/ui";

const WatchlistAction = ({ movieId, movieTitle, children }: WatchlistActionProps) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const inWatchlist = isInWatchlist(movieId);
    const safeTitle = movieTitle || "This movie";
    const actionLabel = inWatchlist ? "remove" : "add";
    const confirmButtonLabel = inWatchlist ? "Delete" : "Add";
    const dialogTitle = inWatchlist ? "Delete from watchlist?" : "Add to watchlist?";
    const dialogDescription = inWatchlist
        ? `Are you sure you want to delete "${safeTitle}" from your watchlist?`
        : `Are you sure you want to add "${safeTitle}" to your watchlist?`;

    const handleConfirm = async () => {
        setPending(true);

        const success = inWatchlist
            ? await removeFromWatchlist(movieId)
            : await addToWatchlist(movieId);

        setPending(false);

        if (!success) {
            toast.error(useWatchlistStore.getState().error ?? `Failed to ${actionLabel} this movie.`);
            return;
        }

        toast.success(
            inWatchlist
                ? `"${safeTitle}" has been deleted from your watchlist.`
                : `"${safeTitle}" has been added to your watchlist.`
        );
        setOpen(false);
    };

    return (
        <>
            {children({
                inWatchlist,
                pending,
                openDialog: () => setOpen(true),
            })}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent showCloseButton={!pending}>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>{dialogDescription}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant={inWatchlist ? "destructive" : "default"}
                            onClick={handleConfirm}
                            disabled={pending}
                        >
                            {pending ? "Please wait..." : confirmButtonLabel}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WatchlistAction;
