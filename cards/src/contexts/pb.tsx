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

    decks: RecordModel[];
}

const PocketContext = createContext<PocketContextType>({} as PocketContextType);

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
    const pb = useMemo(() => new PocketBase("http://192.168.0.14:8090/"), []);

    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);
    const [decks, setDecks] = useState<RecordModel[]>([]);

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        });
    }, []);

    useEffect(() => {
        const fetchDecks = async () => {
            const decks = await pb.collection("decks").getFullList();
            setDecks(decks);
        };

        fetchDecks();

    }, [pb]);

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

    return (
        <PocketContext.Provider
            value={{ pb, token, user, register, login, logout, decks }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);
