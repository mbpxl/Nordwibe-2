import { useMemo } from "react";
import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../../shared/Components/Loading/Loading";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import { useGetUser } from "../../../../SearchPage/service/useGetUser";
import { useGetChats } from "../../../service/useGetChats";
import SupportChat from "../SupportChat/SupportChat";
import ChatItem from "../ChatItem/ChatItem";
import { useGetMe } from "../../../../ProfilePage/service/useGetMe";

type ChatMsg = {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  readed_at: string | null;
  from_user_id: string;
  to_user_id: string;
};

const ChatList = () => {
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
      b.created_at > a.created_at ? 1 : -1
    );
  }, [chatsData, currentUserId]);

  const ids = useMemo(
    () => (threads.length ? threads.map((t) => t.companionId).join(",") : ""),
    [threads]
  );

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUser(ids);

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
    <Wrapper className="bg-purple-background-wrap min-h-screen pt-1 pb-16">
      <div>
        <SupportChat />
        <div className="flex flex-col gap-3 mt-4">
          {threads.map((chat) => {
            const user = userMap[chat.companionId];
            return (
              <ChatItem
                key={chat.id}
                name={user?.username || "Неизвестный"}
                message={
                  chat.from_user_id === currentUserId
                    ? `Вы: ${chat.text}`
                    : chat.text
                }
                avatar={user?.avatar_url}
                companionId={chat.companionId}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default ChatList;
