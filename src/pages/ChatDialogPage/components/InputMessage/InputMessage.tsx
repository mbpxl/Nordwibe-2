import { useState } from "react";
import { useSendMessage } from "../../service/useSendMessage";

const InputMessage = ({ toUserId }: { toUserId: string }) => {
  const [message, setMessage] = useState("");
  const { mutate: sendMessage } = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({
        text: message.trim(),
        to_user_id: toUserId,
      });
      setMessage("");
    }
  };

  return (
    <div className="bg-white">
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="px-2">
          <div className="relative flex justify-center gap-[2.5rem] px-2 py-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full outline-0 border-1 border-black pt-2 pl-3 pr-10 rounded-xl text-[1rem] leading-5 font-medium"
              placeholder="Сообщение"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <button type="submit">
                <img src="/icons/message/send-message.svg" alt="send" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
