import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";

interface EditorProps {
  height: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ height, value, onChange }: EditorProps) {
  const handleChange = React.useCallback((val: any, viewUpdate: any) => {
    onChange(val);
  }, [onChange]);

  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={[yaml()]}
      onChange={handleChange}
    />
  );
}