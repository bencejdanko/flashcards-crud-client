import { CardTag, PocketBaseError } from "./types";
import { getPocketBase } from "./connection";

async function createCardTag(cardId: string, tagId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, cardTag: undefined };
    }

    try {
        const cardTag = await pb!.collection("cards_tags").create({
            card_id: cardId,
            tag_id: tagId,
        }) as CardTag;
        return { error: undefined, cardTag };
    } catch (error) {
        return { error: error as PocketBaseError, cardTag: undefined };
    }
}

async function deleteCardTag(cardTagId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error };
    }

    try {
        await pb!.collection("cards_tags").delete(cardTagId);
        return { error: undefined };
    } catch (error) {
        return { error: error as PocketBaseError };
    }
}

export { createCardTag, deleteCardTag }