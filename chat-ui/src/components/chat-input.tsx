import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    console.log("Message sent:", input);
  };

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
      <input
        type="text"
        value={input}
        placeholder="Type your message..."
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-full
         hover:bg-blue-600 transition cursor-pointer"
      >
        Send
      </button>
    </div>
  );
}
