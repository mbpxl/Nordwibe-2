/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatItem from "../ChatItem/ChatItem";

const ChatList = () => {
  const arr = [
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
    <ChatItem />,
  ];

  return (
    <>
      <div className="bg-[#F0F0F0] px-3 pt-1 pb-16">
        <div>
          {arr.map((elem: any) => (
            <div className="mt-4">{elem}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
