import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import { useEffect, useState } from "react";
import { socket } from "./util/socket";
import MessageType from "./types/MessageType";

type EmittedChatMessage = {
  user: string | undefined;
  message: string;
};

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessages(data: EmittedChatMessage) {
      setMessages((messages) => [...messages, data]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new message", onMessages);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new message", onMessages);
    };
  }, [messages]);

  const addUser = (username: string) => {
    socket.emit("add user", username);
  };

  const logOut = (username: string) => {
    socket.emit("log out", username);
    setMessages([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ChatPage
                socket={socket}
                isConnected={isConnected}
                messagesState={messages}
                setMessages={setMessages}
                addUser={addUser}
                logOut={logOut}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
