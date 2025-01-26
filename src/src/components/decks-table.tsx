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

import { Deck } from "@/contexts/pb/types";

import { Delete, Edit, Play, RefreshCcw } from "lucide-react";

// @ts-ignore
import Spinner from "@/assets/spinner.svg?react";

import { Link } from "react-router-dom";

import { UpdateDeckDialog } from "./update-deck";
import { DeleteDeckDialog } from "./delete-deck";

function PaginatingDecksTable({ limit = 10 }: { limit?: number }) {
    const [page, setPage] = useState(1);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const { getDeckList, getUser, getAuthModel } = usePocket();

    async function fetchDecks() {
        setLoading(true);
        const { decks, error } = await getDeckList(page, limit);
        setLoading(false);

        if (error) {
            console.error(error);
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
    });

    useEffect(() => {
        fetchDecks();
    }, [page]);

    return (
        loading ? <Spinner /> : (
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
                                    <Link
                                        to={`/editor/${deck.id}`}
                                        title="Open deck in the editor"
                                    >
                                        <Play size={20} />
                                    </Link>

                                    <UpdateDeckDialog
                                        deckProp={deck}
                                        callback={fetchDecks}
                                    >
                                        <button title="Edit the deck name and description">
                                            <Edit size={20} />
                                        </button>
                                    </UpdateDeckDialog>

                                    <DeleteDeckDialog
                                        deckProp={deck}
                                        callback={fetchDecks}
                                    >
                                        <button title="Delete the deck">
                                            <Delete size={20} />
                                        </button>
                                    </DeleteDeckDialog>
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
                                    className="absolute"
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
