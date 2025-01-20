import React, { useEffect, useRef, useState } from "react";
import { usePocket } from "@/contexts/pb";
import { AlertCircle, Cloud } from "lucide-react";


interface CodeEditorPanelProps {
    cardId: string;
    onChange: (value: string) => void;
}

function CodeEditorPanel({ cardId, onChange }: CodeEditorPanelProps) {
    const editorValue = useRef<string>("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [saved, setSaved] = useState<boolean>(true);
    const { setCardModel } = usePocket();

    useEffect(() => {});

    return (
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
    );
}

export default CodeEditorPanel;
