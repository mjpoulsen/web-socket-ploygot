import { useCallback, useEffect, useState } from "react";

type ChatBoxProps = {
  onSubmit: (message: string) => void;
};
const ChatBox = ({ onSubmit }: ChatBoxProps) => {
  const [message, setMessage] = useState("");

  const submit = useCallback(() => {
    if (message.length > 0) {
      onSubmit(message);
      setMessage("");
    }
  }, [message, onSubmit]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        submit();
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [submit]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div className="bg-gray-500 rounded-md p-5 my-5 flex">
      <button
        className="bg-gray-100 text-black rounded-md p-2 m-1 font-bold"
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        Chat
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          handleMessageChange(e);
        }}
        className="bg-gray-100 rounded-md p-2 m-1 text-black w-full"
      />
    </div>
  );
};

export default ChatBox;
