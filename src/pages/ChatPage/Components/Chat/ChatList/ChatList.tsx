/* eslint-disable @typescript-eslint/no-explicit-any */
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
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
    <Wrapper className={"bg-purple-background-wrap pt-1 pb-16"}>
      <div>
        {arr.map((elem: any) => (
          <div className="mt-4">{elem}</div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChatList;
