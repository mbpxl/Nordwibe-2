import { useState } from "react";

type ChatBubbleTypes = {
  fromMe: boolean;
  message: string;
  time: string;
};

const ChatBubble: React.FC<ChatBubbleTypes> = ({ fromMe, message, time }) => {
  const [isPhotoOpened, setIsPhotoOpened] = useState<boolean>(false);

  const isPhoto = message.startsWith("/") || message.startsWith("http");

  const handleOpenPhoto = () => setIsPhotoOpened(true);
  const handleClosePhoto = () => setIsPhotoOpened(false);

  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const messageDate = `${hours}:${minutes}`;

  return (
    <>
      <div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`max-w-[200px] mt-1 py-2 pb-4 px-3 ${
            fromMe ? "bg-white" : "bg-[#E1E1F3] text-[#35339B]"
          } relative rounded-xl`}
        >
          {isPhoto ? (
            <img
              src={message}
              alt="photo"
              className="rounded-lg cursor-pointer object-cover max-h-40"
              onClick={handleOpenPhoto}
            />
          ) : (
            <h1 className="whitespace-pre-wrap break-words">{message}</h1>
          )}
          <h2 className="absolute right-1 bottom-1 text-[#35339B] text-[0.625rem]">
            <div className="flex items-center gap-[0.5px]">
              {fromMe ? <img src="/icons/chat/readed.svg" alt="" /> : ""}
              <p>{messageDate}</p>
            </div>
          </h2>
        </div>
      </div>

      {isPhotoOpened && (
        <div
          onClick={handleClosePhoto}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={message}
              alt="fullscreen photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={handleClosePhoto}
              className="absolute -top-10 right-0 text-white p-2"
            >
              х
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
