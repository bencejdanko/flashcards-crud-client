import { Card, PocketBaseError } from "./types";

import { getPocketBase } from "./connection";

async function getCardList(deckId: string, page: number, limit: number) {
    const { pb, error } = getPocketBase()

    if (error) {
        return { error: error, cards: undefined}
    }

    const recordsList = await pb!.collection('cards').getList(page, limit, {
        filter: `deck_id = "${deckId}"`
    })

    const cards = recordsList.items.map((record) => record as unknown as Card)

    return { error: undefined, cards }
}

async function createCard(deckId: string, document: string) {
    const { pb, error } = getPocketBase()

    if (error) {
        return { error: error, card: undefined }
    }

    try {
        const card = await pb!.collection('cards').create({
            deck_id: deckId,
            document: document,
            approved: true,
        }) as Card
        return { error: undefined, card }
    } catch (error) {
        return { error: error as PocketBaseError, card: undefined }
    }
}

async function updateCardDocument(cardId: string, document: string) {
    const { pb, error } = getPocketBase()

    if (error) {
        return { error: error, card: undefined }
    }

    try {
        const card = await pb!.collection('cards').update(cardId, {
            document: document,
        }) as Card
        return { error: undefined, card }
    } catch (error) {
        return { error: error as PocketBaseError, card: undefined }
    }
}

export { getCardList, createCard, updateCardDocument }
