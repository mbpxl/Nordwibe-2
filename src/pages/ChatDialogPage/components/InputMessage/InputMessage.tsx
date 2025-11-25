import { useState } from "react";
import { useSendMessage } from "../../service/useSendMessage";
import Modal from "../../../../shared/Components/Modal/Modal";

interface InputMessageProps {
  toUserId: string;
  isChatBlocked: boolean;
  blockReason: "blocked_by_me" | "blocked_by_them";
}

const InputMessage = ({
  toUserId,
  isChatBlocked,
  blockReason,
}: InputMessageProps) => {
  const [message, setMessage] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const { mutate: sendMessage } = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isChatBlocked) {
      setShowBlockModal(true);
      return;
    }

    if (message.trim()) {
      sendMessage({
        text: message.trim(),
        to_user_id: toUserId,
      });
      setMessage("");
    }
  };

  const handleInputClick = () => {
    if (isChatBlocked) {
      setShowBlockModal(true);
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit}>
        <div className="px-2">
          <div className="relative flex justify-center gap-[2.5rem] px-2 py-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onClick={handleInputClick}
              readOnly={isChatBlocked}
              className={`w-full outline-0 border-1 border-black pt-2 pl-3 pr-10 rounded-xl text-[1rem] leading-5 font-medium ${
                isChatBlocked ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder={isChatBlocked ? "Чат заблокирован" : "Сообщение"}
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <button
                type="submit"
                disabled={isChatBlocked}
                className={isChatBlocked ? "opacity-50 cursor-not-allowed" : ""}
              >
                <img src="/icons/message/send-message.svg" alt="send" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Модальное окно при попытке отправить сообщение в заблокированном чате */}
      <Modal
        isOpen={showBlockModal}
        closeModal={() => setShowBlockModal(false)}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src="/icons/block.svg"
              alt="Заблокирован"
              className="w-12 h-12 mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-black-heading">
              {blockReason === "blocked_by_me"
                ? "Вы заблокировали этого пользователя"
                : "Пользователь заблокировал вас"}
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            {blockReason === "blocked_by_me"
              ? "Вы не можете отправлять сообщения заблокированному пользователю. Разблокируйте пользователя в его профиле, чтобы возобновить общение."
              : "Этот пользователь заблокировал вас. Вы не можете отправлять ему сообщения."}
          </p>
          <button
            onClick={() => setShowBlockModal(false)}
            className="bg-purple-main px-6 py-2 rounded-lg text-white"
          >
            Понятно
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default InputMessage;
