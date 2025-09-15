import { useNavigate } from "react-router-dom";
import { baseURLforImages } from "../../../../../shared/plugin/axios";

type ChatItemProps = {
  name: string;
  message: string;
  avatar?: string;
  companionId: string;
};

const ChatItem = ({ name, message, avatar, companionId }: ChatItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chats/${companionId}`)}
      className="bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px] cursor-pointer hover:bg-gray-100 transition"
    >
      <div
        className={`w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 flex justify-center items-center ${
          !avatar && "bg-purple-sub-button"
        }`}
      >
        {avatar ? (
          <img
            src={baseURLforImages + avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white font-semibold text-4xl">
            {name[0].toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[0.875rem] text-black-heading font-semibold leading-5 text-left">
          {name}
        </h2>
        <p className="text-black-heading text-[0.8rem] font-medium leading-4 text-left">
          {message.slice(0, 54)}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
