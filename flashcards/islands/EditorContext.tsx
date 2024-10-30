import { useState, useContext } from "https://esm.sh/v128/preact@10.22.0/hooks/src/index.js";
import { createContext } from "https://esm.sh/v128/preact@10.22.0/src/index.js";

interface EditorContextType {
  content: string;
  setContent: (content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: any }) => {
  const [content, setContent] = useState<string>("");

  return (
    <EditorContext.Provider value={{ content, setContent }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};