import { useEffect, useState } from "react";
import { EditorMenu } from "@/components";

import { useEditorTabs } from "@/contexts/editor-tabs";
import { Card, Deck } from "@/contexts/pb/types";
import { useParams } from "react-router-dom";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
    BookText,
    Code,
    Logs,
    Plus,
    Search,
    TagsIcon,
    Trash,
    TriangleAlert,
    X,
} from "lucide-react";

import { usePocket } from "@/contexts";

import { DeleteCardDialog } from "@/components";

function Editor() {
    const [deckId, setDeckId] = useState<string | undefined>(undefined);
    const [deck, setDeck] = useState<Deck | undefined>(undefined);
    const [cards, setCards] = useState<Card[]>([]);
    const { deck_id } = useParams();

    const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);
    const [activeCard, setActiveCard] = useState<Card | undefined>(undefined);
    const [activeCardError, setActiveCardError] = useState<boolean>(false);

    const { openTabs, closeCard, openCard, openSavedTabs } = useEditorTabs();

    const { getDeck, getCardList, questions, getCard } = usePocket();


    /**
     * Retrieve the card from the server and set it as the active card
     */
    async function fetchCardAndSetActiveCard(cardId: string) {
        const { card, error } = await getCard(selectedTab!);
        
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
            return;
        }
        
        setActiveCard(card);
    }

    /**
     * On page load, open the saved tabs from local storage
     */
    useEffect(() => {
        openSavedTabs();
    }, []);

    useEffect(() => {

        if (!selectedTab) {
            return;
        }

        fetchCard();

    }, [selectedTab]);


    useEffect(() => {

        if (!activeCard) {
            return;
        }

        setSelectedTab(openTabs[openTabs.length - 1]);

    }, [openTabs])

    useEffect(() => {
        if (!deck_id) {
            return;
        }

        async function fetchDeck() {
            const { deck, error } = await getDeck(deck_id!);

            if (error) {
                console.error(error);
                return;
            }

            setDeck(deck);
        }

        setDeckId(deck_id);
        fetchDeck();
    }, [deck_id]);

    async function fetchCards() {
        if (!deck) {
            return;
        }

        const { cards, error } = await getCardList(deck.id, 1, 10);

        if (error) {
            console.error(error);
            return;
        }

        setCards(cards!);
    }

    useEffect(() => {
        fetchCards();
    }, [deck]);

    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            {deck
                ? <EditorMenu deck={deck} createCardCallback={fetchCards} />
                : <p>Error</p>}
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="max-w-xs min-w-xs">
                    <div
                        className="flex m-3 flex-row gap-2 items-center text-muted-foreground focus-within:ring-2 focus-within:blue-500 p-1 text-sm"
                        onClick={() =>
                            document.getElementById("search-input")?.focus()}
                    >
                        <Search size={15} />
                        <input
                            id="search-input"
                            placeholder="Search"
                            className="focus:outline-none"
                        />
                    </div>
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            className="text-left hover:bg-blue-50 border-muted-foreground p-2 text-sm w-full flex items-center gap-2"
                            onClick={() => openCard(card.id)}
                        >
                            {questions.map((question) => {
                                if (question.type === card.type) {
                                    return (
                                        <question.icon
                                            key={question.type}
                                            width={15}
                                            height={15}
                                        />
                                    );
                                }
                                return null;
                            })}
                            {card.id}
                        </button>
                    ))}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    {/* Tab UI */}
                    <div className="border-t grow">
                        {openTabs.length > 0 && selectedTab && (
                                    <div>
                                        <div className="flex flex-row ">
                                            {openTabs.map((cardId) => (
                                                <button
                                                    className={`w-auto w-max-[300px] border-r ${
                                                        cardId == selectedTab
                                                            ? "border-t border-t-4 border-t-blue-500"
                                                            : "border-b"
                                                    } px-1 py-1 flex justify-between text-sm`}
                                                    onClick={() => {
                                                        if (cardId === selectedTab) {
                                                            setSelectedTab(undefined);
                                                            return;
                                                        }
                                            
                                                        setSelectedTab(cardId);
                                                    }}
                                                >
                                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap mx-3">
                                                        {cardId}
                                                    </p>
                                                    <button
                                                        className="h-full text-muted-foreground hover:bg-muted aspect-square rounded flex justify-center items-center"
                                                        onClick={() =>
                                                            closeCard(cardId)}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </button>
                                            ))}
                                            <div className="flex-grow border-b items-center flex">
                                                <button className="pl-2">
                                                    <Plus
                                                        size={15}
                                                        onClick={() => {}}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-grow border-b p-5 flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <button className="border p-2 items-center flex rounded">
                                                    <TagsIcon size={20} />
                                                </button>

                                                <DeleteCardDialog cardProp={activeCard!} callback={() => {
                                                    closeCard(selectedTab);
                                                    setSelectedTab("");
                                                    fetchCards();
                                                }}>
                                                    <button className="border p-2 flex gap-2 items-center text-sm rounded">
                                                        <Trash size={15} />
                                                        Delete
                                                    </button>
                                                </DeleteCardDialog>
                                            </div>

                                            <div className="flex flex-row gap-3">
                                                <div className="grid grid-cols-2 border rounded text-sm">
                                                    <div className="border-r p-2 flex gap-2 items-center">
                                                        <Logs size={15} />
                                                        Form
                                                    </div>
                                                    <div className="p-2 flex gap-2 items-center">
                                                        <Code size={15} />
                                                        Code
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 border rounded text-sm">
                                                    <div className="border-r p-2 flex gap-2 items-center">
                                                        <BookText size={15} />
                                                        Preview
                                                    </div>
                                                    <div className="p-2 flex gap-2 items-center">
                                                        <TriangleAlert
                                                            size={15}
                                                        />
                                                        Errors
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <ResizablePanelGroup
                                            className="grow"
                                            direction="horizontal"
                                        >
                                            <ResizablePanel>
                                                Editor
                                            </ResizablePanel>
                                            <ResizableHandle withHandle />
                                            <ResizablePanel>
                                                Preview
                                            </ResizablePanel>
                                        </ResizablePanelGroup>
                                    </div>
                                ) || (
                            <div className="p-5">
                                <div className="p-10">
                                    <div className="text-3xl">
                                        Flashcards Editor
                                    </div>
                                    <div className="text-xl text-muted-foreground">
                                        A modern editor for creating flashcards.
                                    </div>

                                    <div className="text-xl mt-5">
                                        Create with AI
                                    </div>
                                    <div className="text-xl mt-5">
                                        Import existing
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Editor;
