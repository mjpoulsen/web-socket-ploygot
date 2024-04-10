type MessageProps = {
  text: string;
  user: string | undefined;
};

const Message = ({ text, user }: MessageProps) => {
  return (
    <div className="flex-col rounded-md bg-gray-100 p-2 m-2 text-black max-w-60">
      <span className="font-bold">{user}: </span>
      <span>{text}</span>
    </div>
  );
};

export default Message;
