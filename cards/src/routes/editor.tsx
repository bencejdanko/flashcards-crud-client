import { useEffect, useRef, useState } from "react";
import { usePocket } from "@/contexts/pb";
import { EditorMenu, TextEditor } from "@/components";
import { GripVertical } from "lucide-react";
import { useParams } from "react-router-dom";

import YAML from "yaml";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

function Editor() {
    const [editorHeight] = useState(0);
    const editorValue = useRef<string>("");
    const [parsedYAML, setParsedYAML] = useState([{}]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { id } = useParams();

    const { getDeckModel, setDeckModel } = usePocket();

    useEffect(() => {
        /**
         * Set a timer that will periodically check if the document has changed, and if true,
         * save the document to the database.
         */
        async function handleSync() {
            console.log("starting sync process for editor");

            if (!id) {
                console.error("No deck id provided");
                return;
            }

            // get initial doc
            getDeckModel(id).then((model) => {
                editorValue.current = model.document;
                handleChange(editorValue.current);
            });

            intervalRef.current = setInterval(() => {
                getDeckModel(id!).then((model) => {
                    let currentDocument = model.document;

                    if (currentDocument === editorValue.current) {
                        console.log("document has not changed");
                        return;
                    }

                    currentDocument = editorValue;
                    console.log("Saving document...");

                    const modifed_model = model;
                    modifed_model.document = editorValue.current;
                    setDeckModel(id, model).then((result) => {
                        console.log("Document saved");
                    }).catch((error) => {
                        console.error("Failed to save document", error);
                    });
                });
            }, 5000);
        }

        handleSync();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    //handleSync();

    interface Card {
        id?: string;
        question?: string;
        answer?: string;
        error?: string;
    }

    const handleChange = (value: string) => {
        editorValue.current = value;

        try {
            const parsed = YAML.parse(editorValue.current);
            setParsedYAML(parsed);
        } catch (error) {
            setParsedYAML([{ error: `Failed to parse YAML: ${error}` }]);
        }
    };

    const Flashcard: React.FC<{ card: Card }> = ({ card }) => {
        const [flipped, setFlipped] = useState(false);

        return (
            <div
                className={`flashcard ${flipped ? "flipped" : ""}`}
                onClick={() => setFlipped(!flipped)}
                style={{
                    width: "600px",
                    height: "350px",
                    margin: "10px",
                    perspective: "1000px",
                    cursor: "pointer",
                }}
            >
                <div
                    className="flashcard-inner"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: flipped ? "rotateY(180deg)" : "none",
                    }}
                >
                    <div
                        className="flashcard-front"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            backgroundColor: "#fff",
                            color: "#000",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                        }}
                    >
                        {card.question}
                    </div>
                    <div
                        className="flashcard-back"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            backgroundColor: "#fff",
                            color: "#000",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        {card.answer}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            <EditorMenu />
            <ResizablePanelGroup
                direction="horizontal"
                className="overflow-auto h-[750px]"
            >
                <ResizablePanel>
                    <div className="editor relative m-2 shadow shadow-lg">
                        <TextEditor
                            value={editorValue.current}
                            onChange={handleChange}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel>
                    <div className="flex justify-center">
                        <div className="max-w-[600px] flex flex-wrap overflow-auto">
                            {parsedYAML && parsedYAML.flashcards &&
                                    Array.isArray(parsedYAML.flashcards) &&
                                    parsedYAML.flashcards.map((card: Card) => (
                                        <Flashcard key={card.id} card={card} />
                                    )) || (
                                <div>
                                    not an array: {JSON.stringify(parsedYAML)}
                                </div>
                            )}
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <div className="flex-grow flex justify-center">
                        Chatbot here
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Editor;
