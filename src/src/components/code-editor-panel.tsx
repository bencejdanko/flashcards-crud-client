import { useEffect, useState } from "react";
import { AlertCircle, Cloud } from "lucide-react";


function CodeEditorPanel() {
    const [saved] = useState<boolean>(true);

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
