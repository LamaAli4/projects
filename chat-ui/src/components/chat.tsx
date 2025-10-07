import { useState } from "react";
import type { Message } from "../types/message";
import ChatInput from "./chat-input";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "system",
      text: "Hi there! How can I help you today?",
    },
  ]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div>Welcome to Chat UI</div>
      </div>

      <div className="border-gray-200 bg-gray-50">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
