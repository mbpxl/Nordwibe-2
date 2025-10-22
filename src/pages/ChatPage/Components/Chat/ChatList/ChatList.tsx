import { useMemo } from "react";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import SupportChat from "../SupportChat/SupportChat";
import ChatItem from "../ChatItem/ChatItem";
import { myProfileMisc } from "../../../../ProfilePage/MyProfilePage/misc/myProfileMock";
import { chatsMock } from "../../../misc/chatsMock";
import { usersMock } from "../../../../SearchPage/misc/usersMock";

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
  const currentUserId = myProfileMisc?.id;

  const threads = useMemo(() => {
    if (!chatsMock?.length || !currentUserId)
      return [] as (ChatMsg & { companionId: string })[];

    const map = new Map<string, ChatMsg & { companionId: string }>();

    for (const m of chatsMock as ChatMsg[]) {
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
  }, [chatsMock, currentUserId]);

  const ids = useMemo(
  () => (threads.length ? threads.map((t) => t.companionId) : []),
  [threads]
);

const usersData = usersMock.filter((user: any) => ids.includes(user.id));

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
                name={user?.username || user?.name || "Неизвестный"}
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
