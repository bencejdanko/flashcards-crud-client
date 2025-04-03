import { Deck, PocketBaseError } from "./types";

import { getPocketBase } from "./connection";

/**
 * 
 * @param page 
 * @param limit 
 * @param filter Can 
 * @returns 
 */
async function getDeckList(page: number, limit: number, filter: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, decks: undefined };
    }

    let sortField: string
    switch (filter) {
        case "last_modified":
            sortField = "-updated"
            break;
        case "last_created":
            sortField = "-created"
            break;
        case "alphabetical":
            sortField = "name"
            break;
        default:
            sortField = "-created"
            break;
    }

    try {
        const recordsList = await pb!.collection("decks").getList(page, limit, {
            sort: sortField,
        });

        const decks = recordsList.items.map((record) =>
            record as unknown as Deck
        );

        return { error: undefined, decks };
    } catch (error) {
        return { error: error as PocketBaseError, decks: undefined };
    }
}

async function getDeck(deckId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, deck: undefined };
    }

    try {
        const deck = await pb!.collection("decks").getOne(deckId) as Deck;
        return { error: undefined, deck };
    } catch (error) {
        return { error: error as PocketBaseError, deck: undefined };
    }
}

async function deleteDeck(deckId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error };
    }

    try {
        await pb!.collection("decks").delete(deckId);
        return { error: undefined };
    } catch (error) {
        return { error: error as PocketBaseError };
    }
}

async function createDeck(name: string, description?: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, deck: undefined };
    }

    try {
        const deck = await pb!.collection("decks").create({
            name,
            description,
            user_id: pb?.authStore.model?.id,
        }) as Deck;
        return { error: undefined, deck };
    } catch (error) {
        return { error: error as PocketBaseError, deck: undefined };
    }
}

async function updateDeck(deckId: string, name: string, description?: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, deck: undefined };
    }

    try {
        const deck = await pb!.collection("decks").update(deckId, {
            name,
            description,
        }) as Deck;
        return { error: undefined, deck };
    } catch (error) {
        return { error: error as PocketBaseError, deck: undefined };
    }
}

async function searchDecks(limit: number, search: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, decks: undefined };
    }

    try {
        const recordsList = await pb!.collection("decks").getList(1, limit, {
            filter: pb!.filter(
                "name ~ {:search} || description ~ {:search}",
                { search }
            )
        });

        const decks = recordsList.items.map((record) =>
            record as unknown as Deck
        );

        return { error: undefined, decks };
    } catch (error) {
        return { error: error as PocketBaseError, decks: undefined };
    }
}

export { createDeck, deleteDeck, getDeck, getDeckList, updateDeck, searchDecks };
