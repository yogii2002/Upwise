import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function Controls({ isDisabled = false, onSend }) {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isDisabled) textareaRef.current?.focus();
  }, [isDisabled]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.trim().length) {
      onSend(content.trim());
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t border-base-300 bg-base-100">
      <TextareaAutosize
        ref={textareaRef}
        disabled={isDisabled}
        placeholder="Message AI Chatbot..."
        value={content}
        minRows={1}
        maxRows={6}
        onChange={handleContentChange}
        onKeyDown={handleEnterPress}
        className="
          flex-1 resize-none text-sm leading-relaxed
          p-2 rounded-md border border-base-300
          bg-base-200 text-base-content
          focus:outline-none focus:ring-2 focus:ring-primary/50
        "
      />

      <button
        onClick={handleContentSend}
        disabled={isDisabled || content.trim().length === 0}
        className="
          p-2 rounded-full bg-primary text-white
          hover:bg-primary/90 transition disabled:opacity-50
        "
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 -960 960 960"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}