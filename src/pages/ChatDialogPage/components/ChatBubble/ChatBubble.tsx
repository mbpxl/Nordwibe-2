type ChatBubbleTypes = {
  fromMe: boolean;
  message: string;
  time: string;
  isRead: boolean;
};

const ChatBubble: React.FC<ChatBubbleTypes> = ({
  fromMe,
  message,
  time,
  isRead,
}) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const messageDate = `${hours}:${minutes}`;

  const formatUrl = (url: string): string => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const isUrl = (text: string): boolean => {
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlRegex.test(text);
  };

  const renderMessage = (text: string) => {
    const urlRegex =
      /(https?:\/\/[^\s]+)|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      // Текст до ссылки
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const url = match[1] || match[2];

      if (url && isUrl(url)) {
        const fullUrl = formatUrl(url);
        parts.push(
          <a
            key={match.index}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600 break-all"
          >
            {url}
          </a>
        );
      } else {
        parts.push(match[0]);
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`min-w-[80px] max-w-[200px] mt-1 py-2 px-3 ${
          fromMe ? "bg-white" : "bg-[#E1E1F3] text-[#35339B]"
        } relative rounded-xl`}
      >
        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">
            {renderMessage(message)}
          </div>
          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-[#35339B] text-[0.625rem]">
              {messageDate}
            </span>
            {fromMe && (
              <img
                src={
                  isRead
                    ? "/icons/chat/readed-double.svg"
                    : "/icons/chat/unread.svg"
                }
                alt={isRead ? "прочитано" : "доставлено"}
                className="w-3 h-3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
