import ChatList from "../components/Chat/ChatList/ChatList";
import Heading from "../components/Heading/Heading";

const ChatPage = () => {
  return (
    <>
      <Heading title={"Чаты"} imgSrc={"/icons/search.svg"} />
      <ChatList />
    </>
  );
};

export default ChatPage;
