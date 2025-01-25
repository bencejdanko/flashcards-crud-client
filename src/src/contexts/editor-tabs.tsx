import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useParams } from "react-router-dom";


interface EditorTabsType {
    openCard: (cardId: string) => void;
    closeCard: (cardId: string) => void;
    getCurrentTabs: () => string[]; 
    openCards: string[];
}

export const EditorTabsContext = createContext<EditorTabsType>({} as EditorTabsType);

export const EditorTabsProvider = ({ children }: { children: React.ReactNode }) => {

    const { id } = useParams();

    const [openCards, setOpenCards] = useState<string[]>([]);

    useEffect(() => {
        localStorage.setItem(`openTabs-${id}`, JSON.stringify(["1", "2", "3", "4", "5"]));
    })

    function getCurrentTabs() {
        const tabs = localStorage.getItem(`openTabs-${id}`);
        if (tabs) {
            return JSON.parse(tabs);
        }
        return [];
    }

    function openCard(cardId: string) {
        setOpenCards([...openCards, cardId]);
        console.log("opening card", cardId);
    }

    function closeCard(cardId: string) {
        setOpenCards(openCards.filter((id) => id !== cardId));
    }

    return (
        <EditorTabsContext.Provider value={{
            openCard,
            closeCard,
            getCurrentTabs,
            openCards,
        }}>
            {children}
        </EditorTabsContext.Provider>
    );
};

export const useEditorTabs = () => useContext(EditorTabsContext);