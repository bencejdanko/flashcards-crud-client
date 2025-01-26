import { User } from "./types";
import { getPocketBase } from "./connection";
import { baseUrl } from "./connection";

async function getUser(userId: string) {
    const { pb, error } = getPocketBase();

    if (error) {
        return { error: error, user: undefined };
    }

    const user = await pb!.collection("users").getOne(userId) as User;

    return { error: undefined, user };
}

function toStringUserAvatarUri(user: User) {
    return `${baseUrl}/api/files/users/${user.id}/${user.avatar}`;
}

export { getUser, toStringUserAvatarUri };