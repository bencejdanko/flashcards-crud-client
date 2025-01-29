import { AuthModel, RecordModel, RecordAuthResponse } from "pocketbase";
import PocketBase from "pocketbase";

interface Deck {
    id: string,
    user_id: string,
    name: string,
    card_count: number,
    description?: string,
    created: string,
    updated: string
}

interface Card {
    id: string,
    document: string,
    type: string,
    deck_id: string,
    created: string,
    updated: string
}

interface Tag {
    id: string,
    name: string,
    created: string,
    updated: string
}

interface User {
    id: string,
    email: string,
    name: string,
    deck_count: number,
    avatar?: string
}

interface CardTag {
    card_id: string,
    tag_id: string
    created: string,
    updated: string
}

interface PocketBaseError {
    code?: number,
    message?: string,
    name?: string,
}

interface PocketContextType {

    // Connection functionality
    baseUrl: string,

    // Auth functionality
    authWithPassword: (email: string, password: string) => Promise<{ record: RecordAuthResponse<RecordModel> | undefined; error: PocketBaseError | undefined }>,
    createUser: (email: string, name: string, password: string, passwordConfirm: string) => Promise<{ error: PocketBaseError | undefined; record: RecordModel | undefined }>,
    getAuthModel: () => { error: PocketBaseError | undefined; record: AuthModel | undefined },
    clearAuthStore: () => void,

    // User functionality
    getUser: (userId: string) => Promise<{ error: PocketBaseError | undefined; user: User | undefined }>,
    toStringUserAvatarUri: (user: User) => string,

    
    // Card Functionality
    getCardList: (deckId: string, page: number, limit: number) => Promise<{ error: PocketBaseError | undefined; cards: Card[] | undefined }>,
    createCard: (deckId: string, type: string, document: string) => Promise<{ error: PocketBaseError | undefined; card: Card | undefined }>,
    updateCardDocument: (cardId: string, document: string) => Promise<{ error: PocketBaseError | undefined; card: Card | undefined }>,
    
    // Deck Functionality
    getDeckList: (page: number, limit: number, filter: string) => Promise<{ error: PocketBaseError | undefined; decks: Deck[] | undefined }>,
    getDeck: (deckId: string) => Promise<{ error: PocketBaseError | undefined; deck: Deck | undefined }>,
    createDeck: (name: string, description?: string) => Promise<{ error: PocketBaseError | undefined; deck: Deck | undefined }>,
    deleteDeck: (deckId: string) => Promise<{ error: PocketBaseError | undefined }>,
    updateDeck: (deckId: string, name: string, description?: string) => Promise<{ error: PocketBaseError | undefined; deck: Deck | undefined }>,

    // Tag Functionality
    createTag: (name: string) => Promise<{ error: PocketBaseError | undefined; tag: Tag | undefined }>,
    getTagList: (page: number, limit: number) => Promise<{ error: PocketBaseError | undefined; tags: Tag[] | undefined }>,

    // DeckTag Functionality
    createCardTag: (cardId: string, tagId: string) => Promise<{ error: PocketBaseError | undefined; cardTag: CardTag | undefined }>,
    deleteCardTag: (cardId: string, tagId: string) => Promise<{ error: PocketBaseError | undefined }>

}

export type { PocketContextType, PocketBaseError, Deck, Card, User, Tag, CardTag }