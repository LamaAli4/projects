import { useState } from "react";
import type { Message } from "../types/message";
import ChatInput from "./chat-input";
import { systemMessages } from "../mock/system-messages";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "system",
      text: "Hi there! How can I help you today?", 
    },
  ]);

  const handleSend = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * systemMessages.length);
      const randomReply = systemMessages[randomIndex];

      const systemReply: Message = {
        ...randomReply,
        id: Date.now() + 1, 
      };

      setMessages((prev) => [...prev, systemReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
