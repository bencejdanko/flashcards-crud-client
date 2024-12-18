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

    decks: RecordModel[];
}

//const url = 'http://192.168.0.14:8090/'
const url = "https://pb.32kb.dev/";

const PocketContext = createContext<PocketContextType>({} as PocketContextType);

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
    const pb = useMemo(() => new PocketBase(url), []);

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
        //fetchDecks();
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
            }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);
