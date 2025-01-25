//const url = 'http://192.168.0.14:8090/'
//const url = "https://pb.32kb.dev/";
const url = "http://127.0.0.1:8090/"

import PocketBase from "pocketbase"

import { PocketBaseError } from "./types"

let pb: PocketBase | undefined = undefined

function getPocketBase(): { pb?: PocketBase, error?: PocketBaseError | undefined } {
    if (!pb) {
        try {
            pb = new PocketBase(url)
            return { pb }
        } catch (error) {
            return { error: error as PocketBaseError }
        }
    } else {
        return { pb }
    }
}

export { getPocketBase }