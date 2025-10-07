import ChatInput from "./chat-input";

export default function Chat() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div>Welcome to Chat UI</div>
      </div>

      <div className="border-gray-200 bg-gray-50">
        <ChatInput />
      </div>
    </div>
  );
}
