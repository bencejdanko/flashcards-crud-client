import { User, PocketBaseError } from "./types";
import { getPocketBase } from "./connection";
import { baseUrl } from "./connection";

async function getUser(userId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, user: undefined };
    }

    try {
        const user = await pb!.collection("users").getOne(userId) as User;
        return { error: undefined, user };
    } catch (error) {
        return { error: error as PocketBaseError, user: undefined };
    }
}

function toStringUserAvatarUri(user: User) {
    return `${baseUrl}/api/files/users/${user.id}/${user.avatar}`;
}

export { getUser, toStringUserAvatarUri };