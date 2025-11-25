import { useNavigate } from "react-router-dom";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { useUnreadCounts } from "../../../hooks/useUnreadCounts";
import OptimizedImage from "../../../../../shared/Components/OptimizedImage/OptimizedImage";

type ChatItemProps = {
  name: string;
  message: string;
  avatar?: string;
  companionId: string;
};

const ChatItem = ({ name, message, avatar, companionId }: ChatItemProps) => {
  const navigate = useNavigate();
  const unreadCounts = useUnreadCounts();
  const unreadCount = unreadCounts[companionId] || 0;

  return (
    <div
      onClick={() => navigate(`/chats/${companionId}`)}
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
          {unreadCount > 0 && (
            <div className="flex items-center justify-center min-w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full px-1 ml-2 shrink-0">
              {unreadCount > 99 ? "99+" : unreadCount}
            </div>
          )}
        </div>
        <p className="text-black-heading text-[0.8rem] font-medium leading-4 text-left truncate">
          {message.slice(0, 54)}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
