import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "./chat_components/Sidebar/Sidebar";
import { Chat } from "./chat_components/Chat/Chat";
import { Assistant } from "./assistants/googleai";
import ChatBotLogo from '../assets/Logo/logo_white.png';

function ChatBotHome() {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState();

  const activeChatMessages = useMemo(
    () => chats.find(({ id }) => id === activeChatId)?.messages ?? [],
    [chats, activeChatId]
  );

  useEffect(() => {
    const newAssistant = new Assistant("gemini-2.0-flash");
    setAssistant(newAssistant);
    handleNewChatCreate();
  }, []);

  function handleChatMessagesUpdate(id, messages) {
    const title = messages[0]?.content.split(" ").slice(0, 7).join(" ");

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id
          ? { ...chat, title: chat.title ?? title, messages }
          : chat
      )
    );
  }

  function handleNewChatCreate() {
    const id = uuidv4();
    setActiveChatId(id);
    setChats((prevChats) => [...prevChats, { id, messages: [] }]);
  }

  function handleActiveChatIdChange(id) {
    setActiveChatId(id);
    setChats((prevChats) =>
      prevChats.filter(({ messages }) => messages.length > 0)
    );
  }

  return (
    <div className="drawer lg:drawer-open w-full h-screen bg-base-100 text-base-content overflow-hidden">
      <input id="chatbot-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen">
        <header className="bg-base-200 shadow p-4 flex items-center gap-4">
          <img src={ChatBotLogo} alt="ChatBot Logo" className="h-10" />
          <h2 className="text-xl font-bold">AI Chatbot</h2>
        </header>

        <main className="flex-grow overflow-hidden flex flex-col">
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              assistant={assistant}
              isActive={chat.id === activeChatId}
              chatId={chat.id}
              chatMessages={chat.messages}
              onChatMessagesUpdate={handleChatMessagesUpdate}
            />
          ))}
        </main>
      </div>

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        activeChatMessages={activeChatMessages}
        onActiveChatIdChange={handleActiveChatIdChange}
        onNewChatCreate={handleNewChatCreate}
      />
    </div>
  );
}

export default ChatBotHome;