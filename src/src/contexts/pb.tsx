import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import PocketBase, { AuthModel, RecordModel } from "pocketbase";

interface PocketContextType {
    pb: PocketBase;
    token: string | null;
    user: AuthModel | null;
    register: (
        email: string,
        password: string,
        passwordConfirm: string,
    ) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    createDeck: (name: string) => Promise<RecordModel>;
    getDeckModel: (deckId: string) => Promise<RecordModel>;
    setDeckModel: (deckId: string, model: RecordModel) => Promise<RecordModel>;
    deleteDeck: (deckId: string) => void;
    createCard: (deckId: string) => Promise<RecordModel>;
    getCards: (deckId: string) => Promise<RecordModel[]>;
    setCardModel: (deckId: string, model: RecordModel) => Promise<RecordModel>;
    deleteCard: (cardId: string) => Promise<boolean>;

    decks: RecordModel[];
}

//const url = 'http://192.168.0.14:8090/'
//const url = "https://pb.32kb.dev/";
const url = "http://127.0.0.1:8090/"

const PocketContext = createContext<PocketContextType>({} as PocketContextType);

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
    const pb = useMemo(() => new PocketBase(url), []);
    pb.autoCancellation(false)

    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);
    const [decks, setDecks] = useState<RecordModel[]>([]);

    const fetchDecks = useCallback(async () => {
        const decks = await pb.collection("decks").getFullList();
        setDecks(decks);
    }, [pb]);

    useEffect(() => {
        fetchDecks();
    }, [fetchDecks]);

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        });
    }, []);

    const register = async (
        email: string,
        password: string,
        passwordConfirm: string,
    ) => {
        return await pb
            .collection("users")
            .create({ email, password, passwordConfirm });
    };

    const login = async (email: string, password: string) => {
        return await pb.collection("users").authWithPassword(email, password);
    };

    const logout = () => {
        pb.authStore.clear();
    };

    const createDeck = async (name: string): Promise<RecordModel> => {
        console.log("creating deck");
        if (!user) {
            throw new Error("User not logged in");
        }
        const result = await pb.collection("decks").create({
            name,
            user: user.id,
        });
        fetchDecks();
        return result;
    };

    const getDeckModel = async (deckId: string): Promise<RecordModel> => {
        const model = await pb.collection("decks").getOne(deckId);
        return model;
    };

    const setDeckModel = async (
        deckId: string,
        model: RecordModel,
    ): Promise<RecordModel> => {
        const result = await pb.collection("decks").update(deckId, model);
        //fetchDecks();
        return result;
    };

    const deleteDeck = async (deckId: string): Promise<boolean> => {
        try {
            await pb.collection("decks").delete(deckId);
            await fetchDecks();
            return true;
        } catch (error) {
            console.error("Deck not found", error);
            return false;
        }
    }

    const createCard = async (deckId: string): Promise<RecordModel> => {
        console.log("creating card")

        if (!user) {
            throw new Error("User not logged in");
        }

        const result = pb.collection('cards').create({
            deck_id: deckId,
            document: `question: "What is the capital of France?"
answer: "Paris"
type: "fill-in-the-blank"`,
            approved: true,
        })
        return result
    }

    const getCards = async (deckId: string): Promise<RecordModel[]> => {
        if (!user) {
            throw new Error("User not logged in")
        }

        const result = pb.collection('cards').getFullList({
            filter: `deck_id = "${deckId}"`
        })

        return result
    }

    const deleteCard = async (cardId: string): Promise<boolean> => {
        try {
            await pb.collection("cards").delete(cardId);
            return true;
        } catch (error) {
            console.error("Card not found", error);
            return false;
        }
    }

    const setCardModel = async (deckId: string, model: RecordModel): Promise<RecordModel> => {
        const result = await pb.collection("cards").update(deckId, model);
        return result;
    };

    return (
        <PocketContext.Provider
            value={{
                pb,
                token,
                user,
                register,
                login,
                logout,
                decks,
                createDeck,
                getDeckModel,
                setDeckModel,
                deleteDeck,
                createCard,
                getCards,
                setCardModel,
                deleteCard,
            }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);
