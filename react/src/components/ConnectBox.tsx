import { useCallback, useEffect, useState } from "react";

type ConnectBoxProps = {
  onSubmit: (username: string) => void;
  setUser: (value: React.SetStateAction<string | undefined>) => void;
};

const ConnectBox = ({ onSubmit, setUser }: ConnectBoxProps) => {
  const [username, setUsername] = useState("");

  const submit = useCallback(() => {
    if (username.length > 0) {
      onSubmit(username);
      setUser(username);
    }
  }, [onSubmit, setUser, username]);

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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
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
        Connect
      </button>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          handleUsernameChange(e);
        }}
        className="bg-gray-100 rounded-md p-2 m-1 text-black w-full"
      />
    </div>
  );
};

export default ConnectBox;
