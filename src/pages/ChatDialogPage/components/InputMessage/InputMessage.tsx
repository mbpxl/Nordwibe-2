import { useState } from "react";
// import { useSendMessage } from "../../service/useSendMessage";

const InputMessage = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white">
      {" "}
      <form>
        <div className="px-2">
          <div className="relative flex justify-center gap-[2.5rem] px-2 py-3">
            <textarea
              disabled={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full outline-0 border-1 border-black pt-2 pl-3 pr-10 rounded-xl text-[1rem] leading-5 font-medium"
              placeholder="Сообщение"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <button type="submit" disabled={true}>
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
