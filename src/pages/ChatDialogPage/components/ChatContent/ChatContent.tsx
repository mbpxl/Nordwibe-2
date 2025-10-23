import { useEffect, useRef, useMemo } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import { chatsMock } from "../../../ChatPage/misc/chatsMock";
import { myProfileMisc } from "../../../ProfilePage/MyProfilePage/misc/myProfileMock";

interface ChatContentProps {
  companionId: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ companionId }) => {
  const currentUser = myProfileMisc;
  const allMessages = chatsMock;
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  return (
    <div className="h-full overflow-y-auto bg-purple-main-disabled">
      <div className="pt-3 pb-24">
        {" "}
        {/* Увеличил padding-bottom чтобы сообщения не заезжали под поле ввода */}
        {filteredMessages.map((message: any) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            fromMe={
              currentUser ? message.from_user_id === currentUser.id : false
            }
            time={message.created_at}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContent;
