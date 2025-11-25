import { useEffect, useRef, useMemo } from "react";
import { useGetMe } from "../../../ProfilePage/service/useGetMe";
import { useGetChats } from "../../../ChatPage/service/useGetChats";
import ChatBubble from "../ChatBubble/ChatBubble";
import Loading from "../../../../shared/Components/Loading/Loading";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { useMarkAsRead } from "../../service/useMarkAsRead";

interface ChatContentProps {
  companionId: string;
  isChatBlocked: boolean;
  blockReason: "blocked_by_me" | "blocked_by_them";
}

const ChatContent: React.FC<ChatContentProps> = ({
  companionId,
  isChatBlocked,
  blockReason,
}) => {
  const { data: currentUser, isLoading: isUserLoading } = useGetMe();
  const { data: allMessages, isLoading: isMessagesLoading } = useGetChats();
  const { mutate: markAsRead } = useMarkAsRead();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredMessages = useMemo(() => {
    if (!allMessages || !currentUser) return [];

    return allMessages.filter(
      (message: any) =>
        (message.from_user_id === currentUser.id &&
          message.to_user_id === companionId) ||
        (message.from_user_id === companionId &&
          message.to_user_id === currentUser.id)
    );
  }, [allMessages, companionId, currentUser]);

  // Логика для отметки сообщений как прочитанных
  useEffect(() => {
    if (!currentUser || !filteredMessages.length || isChatBlocked) return;

    // Находим непрочитанные сообщения от companionId к currentUser
    const unreadMessagesFromCompanion = filteredMessages.filter(
      (message: any) =>
        message.from_user_id === companionId &&
        message.to_user_id === currentUser.id &&
        !message.readed_at
    );

    if (unreadMessagesFromCompanion.length > 0) {
      const messageIds = unreadMessagesFromCompanion.map((msg: any) => msg.id);
      markAsRead(messageIds);
    }
  }, [filteredMessages, companionId, currentUser, markAsRead, isChatBlocked]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  if (isUserLoading || isMessagesLoading) return <Loading />;

  return (
    <Wrapper className="h-full overflow-y-auto bg-purple-main-disabled">
      <div className="pt-3 pb-15">
        {/* Баннер блокировки */}
        {isChatBlocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4 mb-4">
            <div className="flex items-center gap-2 justify-center">
              <img
                src="/icons/block.svg"
                alt="Заблокирован"
                className="w-5 h-5"
              />
              <span className="text-red-700 font-medium text-center">
                {blockReason === "blocked_by_me"
                  ? "Вы заблокировали этого пользователя. Новые сообщения недоступны."
                  : "Пользователь заблокировал вас. Новые сообщения недоступны."}
              </span>
            </div>
          </div>
        )}

        {filteredMessages.map((message: any) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            fromMe={
              currentUser ? message.from_user_id === currentUser.id : false
            }
            time={message.created_at}
            isRead={!!message.readed_at}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Wrapper>
  );
};

export default ChatContent;
