import { useState, useEffect } from "react";
import { EditorMenu } from "@/components";

import { useEditorTabs } from "@/contexts/editor-tabs";
import { Deck } from "@/contexts/pb/types";
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
    TagsIcon,
    Trash,
    TriangleAlert,
    X,
} from "lucide-react";

import { usePocket } from "@/contexts";

function Editor() {

    const [deckId, setDeckId] = useState<string | undefined>(undefined);
    const [deck, setDeck] = useState<Deck | undefined>(undefined);
    const { deck_id } = useParams();

    const [selectedTab, setSelectedTab] = useState<string>("1");
    const { openCards, closeCard } = useEditorTabs();

    const { getDeck } = usePocket();

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

    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            {deck ? <EditorMenu deck={deck} /> : <p>Error</p>}
            {/* Tab UI */}
            <div className="border-t grow">
                {/* <TextEditor /> */}

                {openCards.length > 0 && (
                            <div>
                                <div className="flex flex-row ">
                                    {openCards.map((cardId) => (
                                        <button
                                            className={`w-auto w-max-[300px] border-r ${
                                                cardId == selectedTab
                                                    ? "border-t border-t-4 border-t-blue-500"
                                                    : "border-b"
                                            } px-1 py-1 flex justify-between text-sm`}
                                            onClick={() =>
                                                setSelectedTab(cardId)}
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

                                        <button className="border p-2 flex gap-2 items-center text-sm rounded">
                                            <Trash size={15} />
                                            Delete
                                        </button>
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
                                                <TriangleAlert size={15} />
                                                Errors
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ResizablePanelGroup
                                    className="grow"
                                    direction="horizontal"
                                >
                                    <ResizablePanel>Editor</ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel>Preview</ResizablePanel>
                                </ResizablePanelGroup>
                            </div>
                        ) || (
                    <div className="p-5">
                        <div className="p-10">
                            <div className="text-3xl">Flashcards Editor</div>
                            <div className="text-xl text-muted-foreground">
                                A modern editor for creating flashcards.
                            </div>

                            <div className="text-xl mt-5">Create with AI</div>
                            <div className="text-xl mt-5">Import existing</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Editor;
