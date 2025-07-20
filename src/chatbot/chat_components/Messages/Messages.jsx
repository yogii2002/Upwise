import { useRef, useEffect, useMemo } from "react";
import Markdown from "react-markdown";

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I assist you right now?",
  },
];

export function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  const messagesGroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") groups.push([]);
        groups[groups.length - 1].push(message);
        return groups;
      }, [[]]),
    [messages]
  );

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto px-4 py-6 bg-base-100 scrollbar-thin scrollbar-thumb-base-content/20 scrollbar-track-base-300">
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map((group, gi) => (
        <div key={gi} className="flex flex-col gap-2">
          {group.map(({ role, content }, mi) => {
            const isUser = role === "user";
            return (
              <div
                key={mi}
                className={`px-5 py-3 bg-base-200 text-base-content rounded-box border shadow-md transition hover:scale-[1.02] ${
                  isUser ? "self-end" : "self-start"
                }`}
              >
                <Markdown>{content}</Markdown>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
