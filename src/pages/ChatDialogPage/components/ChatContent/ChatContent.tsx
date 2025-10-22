import { useEffect, useRef, useMemo } from "react";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
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


  // Если currentUser не загружен, но сообщения есть, показываем сообщения без определения fromMe
  if (!currentUser) {
    return (
      <Wrapper className="bg-purple-main-disabled overflow-x-scroll pt-3">
        <div style={{ height: "calc(100vh - 181px)" }}>
          {filteredMessages.map((message: any) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              fromMe={false}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="bg-purple-main-disabled overflow-scroll pt-3">
      <div style={{ height: "calc(100vh - 181px)" }}>
        {filteredMessages.map((message: any) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            fromMe={message.from_user_id === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Wrapper>
  );
};

export default ChatContent;
