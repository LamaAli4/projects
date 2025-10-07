import "./App.css";
import Chat from "./components/chat";

function App() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl h-[90vh] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
        <Chat />
      </div>
    </div>
  );
}

export default App;
