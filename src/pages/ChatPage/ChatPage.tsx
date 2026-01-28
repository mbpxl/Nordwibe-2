// components/ChatPage/ChatPage.tsx
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import { useGetMe } from "../ProfilePage/service/useGetMe";
import ChatList from "./Components/Chat/ChatList/ChatList";
import { useChatWithNotifications } from "./service/useChatWithNotifications";
import search from "/icons/search.svg";

const ChatPage = () => {
  const { data: currentUser } = useGetMe();

  const { isConnected } = useChatWithNotifications({
    userId: currentUser?.id,
    onNewMessage: () => {},
  });

  return (
    <>
      <TopicHeader>
        <div className="flex items-center justify-between w-full">
          <h1>Чат</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {isConnected ? "Онлайн" : "Офлайн"}
              </span>
            </div>
            <img src={search} alt="search" />
          </div>
        </div>
      </TopicHeader>

      <ChatList />
    </>
  );
};

export default ChatPage;
