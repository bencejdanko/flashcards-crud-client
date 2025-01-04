import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";

interface EditorProps {
  //height: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ value, onChange }: EditorProps) {
  const handleChange = React.useCallback((val: any, viewUpdate: any) => {
    onChange(val);
  }, [onChange]);

  return (
    <CodeMirror
      value={value}
      className='w-full'
      //height={height}
      extensions={[yaml(), EditorView.lineWrapping]}
      onChange={handleChange}
    />
  );
}