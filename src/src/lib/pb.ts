import PocketBase from "pocketbase";

export const pb = new PocketBase("http://192.168.0.14:8090/");

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