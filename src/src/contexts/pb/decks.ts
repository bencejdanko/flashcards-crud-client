import { Deck, PocketBaseError } from "./types";

import { getPocketBase } from "./connection";

async function getDeckList(page: number, limit: number) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, decks: undefined };
    }

    const recordsList = await pb!.collection("decks").getList(page, limit);
    const decks = recordsList.items.map((record) => record as unknown as Deck);

    return { error: undefined, decks };
}

async function getDeck(deckId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, deck: undefined };
    }

    const deck = await pb!.collection("decks").getOne(deckId) as Deck;

    return { error: undefined, deck };
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
            user: pb?.authStore.model?.id,
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



export { deleteDeck, getDeck, getDeckList, createDeck, updateDeck };
