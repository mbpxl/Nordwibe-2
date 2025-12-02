import { useNavigate } from "react-router-dom";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { useUnreadCounts } from "../../../hooks/useUnreadCounts";
import OptimizedImage from "../../../../../shared/Components/OptimizedImage/OptimizedImage";
import {
  formatMessageTime,
  formatDesktopTime,
} from "../../../../../shared/utils/formatMessageTime";

type ChatItemProps = {
  name: string;
  message: string;
  avatar?: string;
  companionId: string;
  isDesktop?: boolean;
  lastMessageTime?: string; // Время последнего сообщения
  isOwnMessage?: boolean; // Отправил ли я это сообщение
  isRead?: boolean; // Прочитано ли сообщение (только для своих сообщений)
};

const ChatItem = ({
  name,
  message,
  avatar,
  companionId,
  isDesktop = false,
  lastMessageTime,
  isOwnMessage = false,
  isRead = false,
}: ChatItemProps) => {
  const navigate = useNavigate();
  const unreadCounts = useUnreadCounts();
  const unreadCount = unreadCounts[companionId] || 0;

  const handleClick = () => {
    if (isDesktop) {
      navigate(`/chat/${companionId}`, { replace: true });
    } else {
      navigate(`/chats/${companionId}`);
    }
  };

  // Форматируем время в зависимости от платформы
  const formattedTime = lastMessageTime
    ? isDesktop
      ? formatDesktopTime(lastMessageTime)
      : formatMessageTime(lastMessageTime)
    : "";

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <div
          onClick={handleClick}
          className="bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px] cursor-pointer hover:bg-gray-100 transition relative"
        >
          <div
            className={`w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 flex justify-center items-center ${
              !avatar && "bg-purple-sub-button"
            }`}
          >
            {avatar ? (
              <OptimizedImage
                className="rounded-xl shrink-0"
                src={baseURLforImages + avatar}
                alt="avatar"
                width={60}
                height={60}
                quality={30}
                priority={true}
              />
            ) : (
              <div className="text-white font-semibold text-4xl">
                {name[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h2 className="text-[0.875rem] text-black-heading font-semibold leading-5 text-left truncate">
                {name}
              </h2>
              <div className="flex items-center gap-1">
                {lastMessageTime && (
                  <span className="text-xs text-gray-500">{formattedTime}</span>
                )}
                {unreadCount > 0 && (
                  <div className="flex items-center justify-center min-w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full px-1 ml-1 shrink-0">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-black-heading text-[0.8rem] font-medium leading-4 text-left truncate max-w-[80%]">
                {isOwnMessage ? `Вы: ${message}` : message}
              </p>
              {/* Статус прочтения для своих сообщений */}
              {isOwnMessage && (
                <div className="shrink-0 ml-1">
                  {isRead ? (
                    <img
                      src="/icons/chat/readed-double.svg"
                      alt="Прочитано"
                      className="w-4 h-4"
                    />
                  ) : (
                    <img
                      src="/icons/chat/unread.svg"
                      alt="Не прочитано"
                      className="w-4 h-4"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div
          onClick={handleClick}
          className="p-3 flex gap-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <div
            className={`w-12 h-12 rounded-full overflow-hidden shrink-0 flex justify-center items-center ${
              !avatar && "bg-purple-sub-button"
            }`}
          >
            {avatar ? (
              <OptimizedImage
                className="w-full h-full object-cover"
                src={baseURLforImages + avatar}
                alt="avatar"
                width={48}
                height={48}
                quality={30}
                priority={true}
              />
            ) : (
              <div className="text-white font-semibold text-2xl">
                {name[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {name}
              </h2>
              <div className="flex items-center gap-2">
                {lastMessageTime && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formattedTime}
                  </span>
                )}
                {/* Статус прочтения для desktop */}
                {isOwnMessage && (
                  <div className="shrink-0">
                    {isRead ? (
                      <img
                        src="/icons/chat/readed-double.svg"
                        alt="Прочитано"
                        className="w-4 h-4"
                      />
                    ) : (
                      <img
                        src="/icons/chat/unread.svg"
                        alt="Не прочитано"
                        className="w-4 h-4"
                      />
                    )}
                  </div>
                )}
                {unreadCount > 0 && (
                  <div className="flex items-center justify-center min-w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full px-1 shrink-0">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate max-w-[70%]">
                {isOwnMessage ? `Вы: ${message}` : message}
              </p>
              {/* Для чужих сообщений показываем время получения (если последнее) */}
              {!isOwnMessage && unreadCount === 0 && lastMessageTime && (
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                  {formatMessageTime(lastMessageTime)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
