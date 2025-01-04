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

function Editor() {
    const editorValue = useRef<string>("");
    const [parsedYAML, setParsedYAML] = useState([{}]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [cards, setCards] = useState<RecordModel[]>([]);
    const [selectedCard, setSelectedCard] = useState<RecordModel | null>(null);
    const selectedCardIdRef = useRef<String | null>(null);

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
        tags?: string[];
    }

    const handleChange = (value: string) => {
        // Store the editor value in localstorage
        editorValue.current = value;

        try {
            const parsed = YAML.parse(editorValue.current);
            setParsedYAML(parsed);
        } catch (error) {
            setParsedYAML([{ error: `Failed to parse YAML: ${error}` }]);
        }
    };

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
                        <ResizablePanel>
                            <div className="m-2">
                                <Button
                                    className="bg-green-500"
                                    onClick={handleNewCard}
                                >
                                    New Card
                                </Button>
                            </div>

                            <div className="m-2">
                                {cards.map((card) => {
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
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <div className="m-2 flex flex-col h-full">
                        <p className="text-lg font-bold">Preview</p>
                        <hr className="mb-2" />
                        {selectedCard && (() => {
                            let parsedCard = null;

                            try {
                                parsedCard = YAML.parse(
                                    selectedCard.document || "",
                                );
                            } catch (error) {
                                // Ignore errors and keep parsedCard as "null"
                            }

                            return (
                                <div className="relative flex-grow overflow-auto">
                                    <pre>{parsedCard ? parsedCard.question : "Invalid YAML"}</pre>
                                    <Button className="w-full absolute bottom-10">
                                        Reveal answer
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Editor;
