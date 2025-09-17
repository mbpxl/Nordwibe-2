type ChatBubbleTypes = {
  fromMe: boolean;
  message: string;
};

const ChatBubble: React.FC<ChatBubbleTypes> = ({ fromMe, message }) => {
  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[200px] mt-1 py-2 px-3 ${
          fromMe ? "bg-white" : "bg-[#E1E1F3] text-[#35339B]"
        } relative rounded-xl`}
      >
        <h1 className="break-all">{message}</h1>
        <h2 className="absolute right-1 bottom-1 text-[#35339B] text-[0.625rem]">
          {""}
        </h2>
      </div>
    </div>
  );
};

export default ChatBubble;
