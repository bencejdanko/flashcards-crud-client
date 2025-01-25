import { getPocketBase } from "./connection";

import { PocketBaseError } from "./types";

async function authWithPassword(
    email: string,
    password: string,
) {
    const { pb, error } = getPocketBase();

    if (!pb) {
        return { error: error, record: undefined };
    }

    try {
        const record = await pb.collection("users").authWithPassword(
            email,
            password,
        );
        return { record: record, error: undefined };
    } catch (err) {
        return { error: err as PocketBaseError, record: undefined };
    }
}

async function createUser(email: string, name: string, password: string, passwordConfirm: string) {
    try {
        const { pb, error } = getPocketBase();
        if (error) {
            return { error: error, record: undefined };
        }
        const record = await pb?.collection("users").create({
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            name: name,
        });
        return { error: undefined, record };
    } catch (err) {
        return { error: err as PocketBaseError, record: undefined };
    }
}

function getUserModel() {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, record: undefined };
    }

    return { record: pb!.authStore.model, error: undefined };
}

async function clearAuthStore() {
    const { pb } = getPocketBase();
    pb?.authStore.clear();
}

export { authWithPassword, clearAuthStore, getUserModel, createUser };
