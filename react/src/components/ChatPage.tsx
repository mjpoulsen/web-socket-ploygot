import MessageType from "../types/MessageType";
import MessageList from "./MessageList";
import ChatBox from "./ChatBox";
import { Socket } from "socket.io-client";
import { useState } from "react";
import ConnectBox from "./ConnectBox";

type ChatPageProps = {
  socket: Socket;
  isConnected: boolean;
  messagesState: MessageType[];
  setMessages: (value: React.SetStateAction<MessageType[]>) => void;
  addUser: (username: string) => void;
  logOut: (username: string) => void;
};

const ChatPage = ({
  socket,
  isConnected,
  messagesState,
  setMessages,
  addUser,
  logOut,
}: ChatPageProps) => {
  const [user, setUser] = useState<string | undefined>(undefined);

  const onSubmit = (message: string) => {
    const data = { user, message };
    socket.emit("send message", data);

    // Because the server broadcast the message, the sender does not receive the message.
    // This could be a feature for only Socket.io...
    // https://socket.io/docs/v4/emit-cheatsheet/index.html#except-the-sender
    setMessages((messages) => [...messages, data]);
  };

  const disconnectButton = () => {
    return (
      <button
        className="bg-gray-100 text-black rounded-md p-2 m-1 font-bold"
        onClick={() => {
          if (user) {
            logOut(user);
            setUser(undefined);
          }
        }}
      >
        Log Out
      </button>
    );
  };

  const renderConnected = () => {
    return (
      <div>
        <MessageList messages={messagesState} currentUser={user} />
        <ChatBox onSubmit={onSubmit} />
        {disconnectButton()}
      </div>
    );
  };

  const renderDisconnected = () => {
    return <ConnectBox onSubmit={addUser} setUser={setUser} />;
  };

  const render = () => {
    if (user) {
      return renderConnected();
    }

    return renderDisconnected();
  };

  return (
    <>
      <div className="p-10">
        <h1>Web Socket Polygot</h1>
        <h5>Connected: {isConnected ? "Yes" : "No"}</h5>
      </div>
      {render()}
    </>
  );
};

export default ChatPage;
