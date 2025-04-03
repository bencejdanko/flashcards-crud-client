import { PocketContextType } from "./types";
import { createContext, useContext } from "react";

import * as auth from  "./auth";
import * as cards from "./cards";
import * as decks from "./decks";
import * as decksTags from "./cards-tags";
import * as tags from "./tags";
import * as users from "./users";
import * as connection from "./connection";
import * as questions from "./questions";

export const PocketContext = createContext<PocketContextType>(
    {} as PocketContextType,
);

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <PocketContext.Provider
            value={{
                ...questions,
                ...connection,
                ...auth,
                ...cards,
                ...decks,
                ...decksTags,
                ...tags,
                ...users,
            }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);
