import Heading from "../../shared/Components/Heading/Heading";
import ChatList from "./Components/Chat/ChatList/ChatList";

const ChatPage = () => {
  return (
    <>
      <Heading title={"Чаты"} imgSrc={"/icons/search.svg"} />
      <ChatList />
    </>
  );
};

export default ChatPage;
