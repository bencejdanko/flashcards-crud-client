import {
    createContext,
    useContext,
    useState,
} from "react";

import { useParams } from "react-router-dom";


interface EditorTabsType {
    openCard: (cardId: string) => void;
    closeCard: (cardId: string) => void;
    getCurrentTabs: () => string[]; 
    openSavedTabs: () => void;
    openTabs: string[];
}

export const EditorTabsContext = createContext<EditorTabsType>({} as EditorTabsType);

export const EditorTabsProvider = ({ children }: { children: React.ReactNode }) => {

    const { id } = useParams();

    const [openTabs, setOpenCards] = useState<string[]>([]);

    function getCurrentTabs() {
        const tabs = localStorage.getItem(`openTabs-${id}`);
        if (tabs) {
            return JSON.parse(tabs);
        }
        return [];
    }

    function openSavedTabs() {
        const tabs = getCurrentTabs();
        setOpenCards(tabs);
    }


    function openCard(cardId: string) {
        setOpenCards((prevTabs) => {
            const updatedTabs = [...prevTabs, cardId];
            localStorage.setItem(`openTabs-${id}`, JSON.stringify(updatedTabs));
            return updatedTabs;
        });
    }

    function closeCard(cardId: string) {
        const updatedTabs = openTabs.filter((id) => id !== cardId);
        setOpenCards(updatedTabs);
        localStorage.setItem(`openTabs-${id}`, JSON.stringify(updatedTabs));
    }

    return (
        <EditorTabsContext.Provider value={{
            openSavedTabs,
            openCard,
            closeCard,
            getCurrentTabs,
            openTabs,
        }}>
            {children}
        </EditorTabsContext.Provider>
    );
};

export const useEditorTabs = () => useContext(EditorTabsContext);