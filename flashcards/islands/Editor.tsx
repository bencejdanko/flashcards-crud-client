import { useEffect, useRef } from "preact/hooks";

export default function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const value = textarea.value;

          // Insert tab character at the cursor position
          textarea.value = value.substring(0, start) + "\t" + value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return (
    <div class="flex flex-col">
      <div class="resize-x min-w-[400px] max-w-[800px] files ">files</div>
      <textarea
        ref={textareaRef}
        class="w-full flex-grow border border-gray-300 p-2 resize-x min-w-[400px] max-w-[800px]"
        placeholder="Type here..."
      />
    </div>
  );
}