import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePocket } from "@/contexts/pb";
import { EditorMenu, TextEditor } from "@/components";
import { GripVertical } from "lucide-react";
import { useParams } from "react-router-dom";

import YAML from "yaml";

function Editor() {
    const [editorWidth, setEditorWidth] = useState(500); // Initial width for editor container
    const [editorHeight, setEditorHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorValue, setEditorValue] = useState("---\nkey: value\n");
    const [parsedYAML, setParsedYAML] = useState([{}]);

    const { id } = useParams();

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const editor = containerRef.current.querySelector(".editor");
                const editorHeight = editor
                    ? parseFloat(getComputedStyle(editor).height)
                    : 0;
                setEditorHeight(editorHeight);
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    });

    useEffect(() => {
        const handle = document.querySelector(".resize-handle");
        const editor = document.querySelector(".editor");

        if (!handle || !editor) return;

        let isResizing = false;

        const onMouseMove = (e: any) => {
            if (!isResizing) return;
            const containerLeft =
                containerRef.current!.getBoundingClientRect().left;
            const newWidth = e.clientX - containerLeft;

            // Set limits to the resize
            if (newWidth >= 200 && newWidth <= 800) {
                setEditorWidth(newWidth);
            }
        };

        const onMouseUp = () => {
            isResizing = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        handle.addEventListener("mousedown", () => {
            isResizing = true;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        return () => {
            handle.removeEventListener("mousedown", onMouseMove);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    interface Card {
        id?: string;
        question?: string;
        answer?: string;
        error? : string;
    }

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

    useEffect(() => {
        try {
            const parsed = YAML.parse(editorValue);
            setParsedYAML(parsed);
        } catch (error) {
            setParsedYAML([{ error: `Failed to parse YAML: ${error}` }]);
        }
    }, [editorValue]);

    return (
        <div ref={containerRef} className="flex flex-col w-full h-full">
            <EditorMenu />
            <div className="flex flex-row grow">
                <div
                    className="editor relative m-2 shadow shadow-lg"
                    style={{ width: `${editorWidth}px` }} // Set width dynamically
                >
                    <TextEditor
                        value={editorValue}
                        height={`${editorHeight}px`}
                        onChange={setEditorValue}
                    />
                    <div className="resize-handle absolute -right-4 top-0 h-full w-4 cursor-ew-resize flex justify-center items-center">
                        <GripVertical />
                    </div>
                </div>
                <div className="flex-grow flex justify-center">
                    <div 
                        style = {{ height: `${editorHeight}px` }}
                        className="max-w-[600px] flex flex-wrap overflow-auto">
                        {parsedYAML.flashcards && Array.isArray(parsedYAML.flashcards) &&
                            parsedYAML.flashcards.map((card: Card) => (
                                <Flashcard key={card.id} card={card} />
                            )) || <div>not an array: {JSON.stringify(parsedYAML)}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor;
