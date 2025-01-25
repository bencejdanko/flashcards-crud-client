import { PocketBaseError, Tag } from "./types";
import { getPocketBase } from "./connection";

async function createTag(name: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, tag: undefined };
    }

    try {
        const tag = await pb!.collection("tags").create({
            name,
        }) as Tag;
        return { error: undefined, tag };
    } catch (error) {
        return { error: error as PocketBaseError, tag: undefined };
    }
}

async function getTagList(page: number, limit: number) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, tags: undefined };
    }

    try {
        const recordsList = await pb!.collection("tags").getList(page, limit);
        const tags = recordsList.items.map((record) =>
            record as unknown as Tag
        );

        return { error: undefined, tags };
    } catch (error) {
        return { error: error as PocketBaseError, tags: undefined };
    }
}

export { createTag, getTagList };
