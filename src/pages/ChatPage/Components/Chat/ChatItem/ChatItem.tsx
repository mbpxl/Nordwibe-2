import { useNavigate } from "react-router-dom";

type ChatItemProps = {
  name: string;
  message: string;
  avatar?: string;
  companionId: string;
  time: string;
};

const ChatItem = ({
  name,
  message,
  avatar,
  companionId,
  time,
}: ChatItemProps) => {
  const navigate = useNavigate();

  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const messageDate = `${hours}:${minutes}`;

  return (
    <div
      onClick={() => navigate(`/chats/${companionId}`)}
      className="bg-white p-2 flex gap-3 max-w-[700px] relative rounded-[12px] cursor-pointer hover:bg-gray-100 transition"
    >
      <div
        className={`w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 flex justify-center items-center ${
          !avatar && "bg-purple-sub-button"
        }`}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
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
        <div className="text-black-heading text-[0.8rem] font-medium leading-4 text-left">
          {message[0] == "/" ? (
            <p className="text-[#35339B]">{"Изображение"}</p>
          ) : message.length > 54 ? (
            <p>{message.slice(0, 54) + "..."}</p>
          ) : (
            <p>{message}</p>
          )}
        </div>
      </div>
      <div className="absolute right-2 bottom-1 text-[#35339B] text-[0.625rem]">
        {messageDate}
      </div>
    </div>
  );
};

export default ChatItem;
