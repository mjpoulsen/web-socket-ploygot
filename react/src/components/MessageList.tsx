import MessageType from "../types/MessageType";
import Message from "./Message";

type MessageListProps = {
  messages: MessageType[];
  currentUser: string | undefined;
};

const MessageList = ({ messages, currentUser }: MessageListProps) => {
  const renderMessage = (message: MessageType, index: number) => {
    if (message.user === currentUser) {
      return renderCurrentUsersMessage(message, index);
    } else {
      return renderUsersMessage(message, index);
    }
  };

  const renderCurrentUsersMessage = (message: MessageType, index: number) => {
    return (
      <div className="flex justify-end" key={index}>
        {buildMessage(message)}
      </div>
    );
  };

  const renderUsersMessage = (message: MessageType, index: number) => {
    return (
      <div className="flex" key={index}>
        {buildMessage(message)}
      </div>
    );
  };

  const buildMessage = (message: MessageType) => {
    return <Message text={message.message} user={message.user} />;
  };

  return (
    <div className="flex-col bg-gray-500 rounded-md p-5">
      {messages.map((message, index) => renderMessage(message, index))}
    </div>
  );
};

export default MessageList;
