import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import { useEffect, useState } from "react";
import { socketIoClient } from "./util/socket";
import MessageType from "./types/MessageType";

type EmittedChatMessage = {
  user: string | undefined;
  message: string;
};

export default function App() {
  const [isConnected, setIsConnected] = useState(socketIoClient.connected);
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

    socketIoClient.on("connect", onConnect);
    socketIoClient.on("disconnect", onDisconnect);
    socketIoClient.on("newMessage", onMessages);

    return () => {
      socketIoClient.off("connect", onConnect);
      socketIoClient.off("disconnect", onDisconnect);
      socketIoClient.off("newMessage", onMessages);
    };
  }, [messages]);

  const addUser = (username: string) => {
    socketIoClient.emit("addUser", username);
  };

  const logOut = (username: string) => {
    socketIoClient.emit("logOut", username);
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
                socket={socketIoClient}
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
