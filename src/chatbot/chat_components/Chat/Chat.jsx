import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Messages } from "../Messages/Messages";
import { Controls } from "../Controls/Controls";

export function Chat({
  assistant,
  isActive = false,
  chatId,
  chatMessages,
  onChatMessagesUpdate,
}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    setMessages(chatMessages);
    if (assistant?.name === "googleai") {
      assistant.createChat(chatMessages);
    }
  }, [chatId]);

  useEffect(() => {
    onChatMessagesUpdate(chatId, messages);
  }, [messages]);

  function updateLastMessageContent(content) {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === prev.length - 1
          ? { ...m, content: `${m.content}${content}` }
          : m
      )
    );
  }

  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const stream = await assistant.chatStream(
        content,
        messages.filter(({ role }) => role !== "system")
      );

      let first = false;
      for await (const chunk of stream) {
        if (!first) {
          first = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (err) {
      addMessage({
        content:
          err?.message ||
          "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  if (!isActive) return null;

  return (
      <div className="flex flex-col flex-grow h-0 space-y-4">
      {isLoading && (
        <div className="self-center">
          <Loader />
        </div>
      )}

      <div
        className="
          flex-grow w-full
          // bg-gradient-to-br
          rounded-xl
          p-4
          overflow-y-auto
        "
      >
        <Messages messages={messages} />
      </div>

      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </div>
  );
}
