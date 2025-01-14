import { useEffect, useRef, useState } from "react";
import { usePocket } from "@/contexts/pb";
import { Chat, EditorMenu, TextEditor } from "@/components";
import { useParams } from "react-router-dom";
import { RecordModel } from "pocketbase";
import { Trash } from "lucide-react";

import YAML from "yaml";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import { AlertCircle, Cloud } from "lucide-react";

function Editor() {
    const editorValue = useRef<string>("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [cards, setCards] = useState<RecordModel[]>([]);
    const [selectedCard, setSelectedCard] = useState<RecordModel | null>(null);
    const selectedCardIdRef = useRef<String | null>(null);

    const [saved, setSaved] = useState<boolean>(true);

    const { id } = useParams();

    const {
        getDeckModel,
        setDeckModel,
        createCard,
        getCards,
        setCardModel,
        deleteCard,
    } = usePocket();

    useEffect(() => {
        /**
         * Set a timer that will periodically update the active card in localstorage to the database.
         */
        async function handleSync() {
            intervalRef.current = setInterval(() => {
                if (!selectedCardIdRef.current) {
                    return;
                }

                const localStorageCard = localStorage.getItem(
                    selectedCardIdRef.current as string,
                );

                if (!localStorageCard) {
                    return;
                }

                let currentCard = JSON.parse(localStorageCard);

                //console.log("Saving document...");

                setCardModel(currentCard.id, currentCard).then((result) => {
                    //console.log("Document saved");
                    setSaved(true);
                    console.log("saving document...");
                }).catch((error) => {
                    //console.error("Failed to save document", error);
                });
            }, 10000);
        }

        handleSync();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    /**
     * Save the editor to value to localstorage on each change.
     * This is useful for asyncronous saving of the document.
     */
    useEffect(() => {
        if (!selectedCard) {
            return;
        }

        let modifiedCard = selectedCard;
        modifiedCard.document = editorValue.current;

        localStorage.setItem(modifiedCard.id, JSON.stringify(modifiedCard));
    }, [editorValue.current]);

    useEffect(() => {
        if (!id) {
            return;
        }

        async function get(id: string) {
            const cards = await getCards(id);
            setCards(cards);
        }

        get(id);
    }, [getCards, id]);

    interface Card {
        question?: string;
        answer?: string;
        approved?: boolean;
        tags?: string[];
    }

    const handleChange = (value: string) => {
        // Store the editor value in localstorage
        editorValue.current = value;
        setSaved(false);
    };

    useEffect(() => {
    }, [saved]);

    const handleNewCard = async () => {
        if (!id) {
            return;
        }
        const newCard = await createCard(id);
        setCards([...cards, newCard]);
    };

    const handleSetSelectedCard = (card: RecordModel) => {
        setSelectedCard(card);
        selectedCardIdRef.current = card.id as string;
        editorValue.current = card.document;
    };

    const handleDeleteCard = async () => {
        if (!selectedCard) {
            return;
        }

        await deleteCard(selectedCard.id);
        setCards(cards.filter((card) => card.id !== selectedCard.id));
        setSelectedCard(null);
        editorValue.current = "";
    };

    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            <EditorMenu />
            <ResizablePanelGroup
                direction="horizontal"
                className="overflow-auto h-[750px]"
            >
                <ResizablePanel>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel>
                            <Chat />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <div className="m-3">
                                {saved
                                    ? (
                                        <div className="flex gap-3 items-center">
                                            <Cloud
                                                className="text-blue-500"
                                                size={20}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Saved to the cloud
                                            </p>
                                        </div>
                                    )
                                    : (
                                        <div className="flex gap-3 items-center">
                                            <AlertCircle
                                                className="text-red-500"
                                                size={20}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Content currently saving...
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <div className="editor relative m-2 shadow shadow-lg">
                                <TextEditor
                                    value={editorValue.current}
                                    onChange={handleChange}
                                />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel className="grid grid-cols-3">
                            <div className="m-2 flex-col flex gap-2">
                                <Button
                                    className="bg-green-500"
                                    onClick={handleNewCard}
                                >
                                    Fill-in-the-blank
                                </Button>

                                <p className="text-muted-foreground text-sm">
                                    Coming soon
                                </p>

                                <Button
                                    className="bg-green-500"
                                    onClick={handleNewCard}
                                    disabled={true}
                                >
                                    Matching Pairs
                                </Button>

                                <Button
                                    className="bg-green-500"
                                    onClick={handleNewCard}
                                    disabled={true}
                                >
                                    Multiple choice
                                </Button>
                            </div>

                            <div className="m-2 col-span-2">
                                {cards.map((card) => {
                                    if (!card.approved) {
                                        return null;
                                    }
                                    let question = null;
                                    try {
                                        const parsed = YAML.parse(
                                            card.document,
                                        );
                                        question = parsed.question ||
                                            null;
                                    } catch (error) {
                                        // Ignore errors and keep question as "null"
                                    }
                                    return (
                                        <button
                                            key={card.id}
                                            className={`relative flex p-2 rounded w-full ${
                                                card === selectedCard
                                                    ? "bg-secondary"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleSetSelectedCard(card)}
                                        >
                                            <div
                                                className={`mr-10 overflow-y-auto whitespace-nowrap overflow-hidden text-ellipsis ${
                                                    question
                                                        ? ""
                                                        : "italic text-muted-foreground"
                                                }`}
                                            >
                                                {question || "Untitled Card"}
                                            </div>
                                            <button
                                                className="absolute right-0 top-0 p-2 text-red-500"
                                                onClick={handleDeleteCard}
                                            >
                                                <Trash
                                                    size={20}
                                                />
                                            </button>
                                        </button>
                                    );
                                })}
                            </div>
                        </ResizablePanel>
                        <ResizablePanel>
                            <div className="m-2 text-lg font-bold">
                                Generated cards
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Editor;
