import { useEffect, useRef } from "preact/hooks";
import {
  EditorView,
  keymap,
  lineNumbers,
} from "https://esm.sh/@codemirror/view@6.34.1";
import { defaultKeymap } from "https://esm.sh/@codemirror/commands@6.7.1";
import { EditorState } from "https://esm.sh/@codemirror/state@6.4.1";

import { Buffer, Signal, Change } from "../models/socket_models.ts";

const CodeMirror = () => {
  // Create a reference to attach CodeMirror
  const editorViewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null); // WebSocket reference

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket("ws://localhost:8000/api/socket"); // Adjust if your server is running on a different port
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(
        "WebSocket connection established. Requesting initial document...",
      );

      // request the initial document
      const b: Buffer = {
        signal: Signal.INIT,
        value: "",
      };

      ws.send(JSON.stringify(b));
    };

    ws.onmessage = (event) => {
      const buffer: Buffer = JSON.parse(event.data);

      console.log("Received message from server: ", buffer);

      const signal = buffer.signal;
      const value = buffer.value;

      const newContent = value;

      if (editorViewRef.current && signal === Signal.INIT) {
        editorViewRef.current.dispatch({
          changes: {
            from: 0,
            to: editorViewRef.current.state.doc.length,
            insert: newContent,
          },
        });
      }

      if (editorViewRef.current && signal === Signal.UPDATE) {
        editorViewRef.current.dispatch({
          changes: {
            from: 0,
            to: editorViewRef.current.state.doc.length,
            insert: newContent,
          },
        });
      }
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
        extensions: [
          keymap.of(defaultKeymap),
          lineNumbers(),
          EditorView.updateListener.of(async (update) => {
            // if (update.docChanged) {
            //   const origin = update.transactions[0].annotations[0].value; // returns how it was set

            //   //console.log("transactions:", update.transactions);
            //   //const changes = update.transactions[0].changes;
            //   // loop through each transaction and log the changes

            //   //console.log("Changes: ", changes);

            //   if (
            //     wsRef.current && wsRef.current.readyState === WebSocket.OPEN &&
            //     origin === "input.type"
            //   ) {
            //     const changesArray = [];
            //     for (const transaction of update.transactions) {
            //       console.log("CHANGES: ", transaction.changes)
            //       console.log("")
            //     }


            //     const b: Buffer = {
            //       signal: Signal.UPDATE,
            //       value: changesArray as Change[],
            //     };



            //     wsRef.current.send(JSON.stringify(b));
            //   }
            // }
          }),
        ],
        parent: editorRef.current, // Attach CodeMirror to the referenced div
      });

      editorViewRef.current = myView;

      // Cleanup CodeMirror instance on component unmount
      return () => {
        myView.destroy();
      };
    }
  });

  return <div ref={editorRef} style={{ height: "500px" }} />;
};

export { CodeMirror };
