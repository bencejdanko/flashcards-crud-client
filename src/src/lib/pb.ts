import PocketBase from "pocketbase";

export const pb = new PocketBase("https://pb.32kb.dev");

import { writable } from "svelte/store";

export interface DeckModel {
    id?: string;
    name: string;
    user: any;
    cards?: CardModel[];
    created?: Date;
    updated?: Date;
}

interface CardModel {
    question: string;
    answer: string;
    created: Date;
    updated: Date;
}

export const currentUser = writable(pb.authStore.model);