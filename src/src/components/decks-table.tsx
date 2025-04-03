import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { usePocket } from "@/contexts";

import { Deck, PocketBaseError } from "@/contexts/pb/types";

import { AlertCircle, Edit, Play, RefreshCcw, Trash } from "lucide-react";

// @ts-ignore
import Spinner from "@/assets/spinner.svg?react";

import { Link } from "react-router-dom";

import { UpdateDeckDialog } from "./update-deck";
import { DeleteDeckDialog } from "./delete-deck";
import { searchDecks } from "@/contexts/pb/decks";

function PaginatingDecksTable(
    { limit = 10, filter = "-created", search }: {
        limit?: number;
        filter?: string;
        search?: string;
    },
) {
    const [page, setPage] = useState(1);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [total, setTotal] = useState(0);

    const { getDeckList, getUser, getAuthModel } = usePocket();

    async function fetchDecks() {
        setLoadingError(false);
        setLoading(true);

        let decks: Deck[] | undefined;
        let error: PocketBaseError | undefined;

        if (search) {
            ({ decks, error } = await searchDecks(limit, search));
        } else {
            ({ decks, error } = await getDeckList(page, limit, filter));
        }

        setLoading(false);

        if (error) {
            setLoadingError(true);
            return;
        }

        setDecks(decks!);
    }

    function incrementPage() {
        setPage(page + 1);
    }

    function decrementPage() {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    useEffect(() => {
        async function getUserDeckCount() {
            const { record } = await getAuthModel();
            const { user } = await getUser(record?.id || "");

            setTotal(user?.deck_count || 0);
        }

        getUserDeckCount();
    }, []);

    useEffect(() => {
        fetchDecks();
    }, [page, filter, search]);

    return (
        loading
            ? (
                <div className="flex justify-center items-center h-full w-full">
                    <Spinner />
                </div>
            )
            : loadingError
            ? (
                <div className="flex flex-col justify-center items-center h-full w-full gap-5">
                    <div className="flex flex-row gap-2 items-center text-red-500">
                        <AlertCircle size={20} />
                        There was an error retrieving your decks.
                    </div>
                    <button
                        className="rounded flex items-center gap-2 text-muted-foreground bg-muted p-2"
                        onClick={fetchDecks}
                    >
                        <RefreshCcw size={20} /> Retry
                    </button>
                </div>
            )
            : (
                <Table>
                    <TableCaption>{total}/250 decks created</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Cards</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {decks.length > 0
                            ? decks.map((deck: Deck) => (
                                <TableRow key={deck.id}>
                                    <TableCell>
                                        <strong>{deck.name}</strong>
                                    </TableCell>
                                    <TableCell>{deck.description}</TableCell>
                                    <TableCell>{deck.card_count}</TableCell>
                                    <TableCell>
                                        {new Date(deck.created)
                                            .toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(deck.created)
                                            .toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="flex gap-2 text-muted-foreground">
                                        <div className="border flex rounded">
                                            <Link
                                                to={`/editor/${deck.id}`}
                                                title="Open deck in the editor"
                                                className="aspect-square border-r p-2 hover:bg-secondary"
                                            >
                                                <Play size={15} />
                                            </Link>

                                            <UpdateDeckDialog
                                                deckProp={deck}
                                                callback={fetchDecks}
                                            >
                                                <button
                                                    title="Edit the deck name and description"
                                                    className="aspect-square border-r p-2 hover:bg-secondary"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                            </UpdateDeckDialog>

                                            <DeleteDeckDialog
                                                deckProp={deck}
                                                callback={fetchDecks}
                                            >
                                                <button
                                                    title="Delete the deck"
                                                    className="aspect-square p-2 hover:bg-secondary"
                                                >
                                                    <Trash size={15} />
                                                </button>
                                            </DeleteDeckDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan={6} className="">
                                        <div className="h-5 justify-center flex">
                                            No decks found.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <div className="flex justify-between w-full">
                                    <Button
                                        onClick={fetchDecks}
                                        className="absolute bg-muted text-muted-foreground"
                                    >
                                        <RefreshCcw size={20} />
                                    </Button>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <button onClick={decrementPage}>
                                                    <PaginationPrevious />
                                                </button>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink>
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <button onClick={incrementPage}>
                                                    <PaginationNext />
                                                </button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )
    );
}

export { PaginatingDecksTable };
