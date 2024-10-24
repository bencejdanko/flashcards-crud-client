import { useEffect, useRef } from "preact/hooks";
import { EditorView, keymap, lineNumbers } from "https://esm.sh/@codemirror/view";
import { defaultKeymap } from "https://esm.sh/@codemirror/commands";
import { EditorState } from "https://esm.sh/@codemirror/state";


const CodeMirror = ({ initialDoc }: { initialDoc: string }) => {
  // Create a reference to attach CodeMirror
  const editorRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);  // WebSocket reference

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket("ws://localhost:8000/api/socket");  // Adjust if your server is running on a different port
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connection opened");
    
    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    ws.onclose = () => console.log("WebSocket connection closed");

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Ensure the editor is only initialized after the component mounts

    if (editorRef.current) {
      const myView = new EditorView({
        

        doc: initialDoc || "hello", // Use the initialDoc prop
        extensions: [
          keymap.of(defaultKeymap),
          lineNumbers(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newContent = update.state.doc.toString();
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(newContent);
              }
            }
          }),
        ],
        parent: editorRef.current, // Attach CodeMirror to the referenced div

      });

      // Cleanup CodeMirror instance on component unmount
      return () => {
        myView.destroy();
      };
    }
  }, [initialDoc]);

  return <div ref={editorRef} style={{ height: "500px" }} />;
};

export { CodeMirror };
