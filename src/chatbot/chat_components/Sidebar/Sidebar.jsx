import { useState } from "react";

export function Sidebar({
  chats,
  activeChatId,
  activeChatMessages,
  onActiveChatIdChange,
  onNewChatCreate,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleChatClick(chatId) {
    onActiveChatIdChange(chatId);
    setDrawerOpen(false);
  }

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="chatbot-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content flex flex-col">
        <label htmlFor="chatbot-drawer" className="btn btn-ghost drawer-button lg:hidden m-4">
          <MenuIcon />
        </label>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="chatbot-drawer" className="drawer-overlay" onClick={() => setDrawerOpen(false)}></label>
        <aside className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <button
            className="btn btn-neutral btn-sm w-full mb-4"
            disabled={activeChatMessages.length === 0}
            onClick={onNewChatCreate}
          >
            New Chat
          </button>

          <ul className="space-y-2">
            {chats
              .filter(({ messages }) => messages.length > 0)
              .map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={`rounded-lg p-2 shadow-md cursor-pointer hover:bg-primary hover:text-primary-content ${
                    chat.id === activeChatId ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="truncate font-medium">{chat.title}</div>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}
