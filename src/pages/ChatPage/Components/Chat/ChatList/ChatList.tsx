import { useMemo } from "react";
import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../../shared/Components/Loading/Loading";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import { useGetUser } from "../../../../SearchPage/service/useGetUser";
import { useGetChats } from "../../../service/useGetChats";
import SupportChat from "../SupportChat/SupportChat";
import ChatItem from "../ChatItem/ChatItem";
import { useGetMe } from "../../../../ProfilePage/service/useGetMe";
import search from "/icons/search.svg";

type ChatMsg = {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  readed_at: string | null;
  from_user_id: string;
  to_user_id: string;
};

interface ChatListProps {
  isDesktop?: boolean;
}

const ChatList = ({ isDesktop = false }: ChatListProps) => {
  const { data: meData, isLoading: isMeLoading } = useGetMe();
  const currentUserId = meData?.id;

  const {
    data: chatsData,
    isLoading: isChatsLoading,
    isError: isChatsError,
  } = useGetChats();

  const threads = useMemo(() => {
    if (!chatsData?.length || !currentUserId)
      return [] as (ChatMsg & { companionId: string })[];

    const map = new Map<string, ChatMsg & { companionId: string }>();

    for (const m of chatsData as ChatMsg[]) {
      const companionId =
        m.from_user_id === currentUserId ? m.to_user_id : m.from_user_id;

      const prev = map.get(companionId);
      if (!prev || m.created_at > prev.created_at) {
        map.set(companionId, { ...m, companionId });
      }
    }

    return Array.from(map.values()).sort((a, b) =>
      b.created_at > a.created_at ? 1 : -1,
    );
  }, [chatsData, currentUserId]);

  const ids = useMemo(
    () => (threads.length ? threads.map((t) => t.companionId).join(",") : ""),
    [threads],
  );

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUser([ids]);

  const isLoading = isMeLoading || isChatsLoading || isUsersLoading;
  const isError = isChatsError || isUsersError;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const userMap: Record<string, any> = {};
  usersData?.forEach((u: any) => {
    userMap[u.id] = u;
  });

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper className="bg-purple-background-wrap min-h-screen pt-1 pb-16">
          <div>
            <SupportChat />
            <div className="flex flex-col gap-3 mt-4">
              {threads.map((chat) => {
                const user = userMap[chat.companionId];
                const isOwnMessage = chat.from_user_id === currentUserId;
                const isRead = !!chat.readed_at;

                return (
                  <ChatItem
                    key={chat.id}
                    name={user?.username || user?.name || "Неизвестный"}
                    message={chat.text}
                    avatar={user?.avatar_url}
                    companionId={chat.companionId}
                    isDesktop={false}
                    lastMessageTime={chat.created_at}
                    isOwnMessage={isOwnMessage}
                    isRead={isRead}
                  />
                );
              })}
            </div>
          </div>
        </Wrapper>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="h-full flex flex-col">
          {/* Заголовок для desktop */}
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Чаты</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск чатов..."
                  className="w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <img
                  src={search}
                  alt="search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Список чатов с прокруткой */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <SupportChat />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">
                Недавние чаты
              </h3>
              <div className="space-y-1">
                {threads.map((chat) => {
                  const user = userMap[chat.companionId];
                  const isOwnMessage = chat.from_user_id === currentUserId;
                  const isRead = !!chat.readed_at;

                  return (
                    <ChatItem
                      key={chat.id}
                      name={user?.username || user?.name || "Неизвестный"}
                      message={chat.text}
                      avatar={user?.avatar_url}
                      companionId={chat.companionId}
                      isDesktop={true}
                      lastMessageTime={chat.created_at}
                      isOwnMessage={isOwnMessage}
                      isRead={isRead}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatList;
