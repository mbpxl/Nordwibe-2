import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import ChatList from "./Components/Chat/ChatList/ChatList";
import search from "/icons/search.svg";

const ChatPage = () => {
  return (
    <>
      <TopicHeader>
        <h1>Чат</h1>
        <img src={search} alt="search" />
      </TopicHeader>
      <ChatList />
    </>
  );
};

export default ChatPage;
