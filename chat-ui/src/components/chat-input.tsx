export default function ChatInput() {
  return (
    <div className="flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
        Send
      </button>
    </div>
  );
}
