import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";

interface ActionBarProps {
  companionId: string;
  compatibility: number;
  isBlocked?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  companionId,
  compatibility,
  isBlocked = false,
}) => {
  const [isСompatibilityActive, setIsСompatibilityActive] =
    useState<boolean>(false);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCompatibilityChange = () => {
    if (isBlocked) {
      setIsBlockedModalOpen(true);
    } else {
      setIsСompatibilityActive((prev) => !prev);
    }
  };

  const handleWriteMessage = () => {
    if (isBlocked) {
      setIsBlockedModalOpen(true);
    } else {
      navigate("/chats/" + companionId);
    }
  };

  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-4 max-w-[475px] m-auto">
        <div className="flex justify-between items-center gap-5 pt-[0.531rem] pb-[1.094rem] text-white">
          <MessageUserButton
            onClick={handleWriteMessage}
            isBlocked={isBlocked}
          />
          <Сompatibility
            onChange={handleCompatibilityChange}
            compatibility={compatibility}
            isBlocked={isBlocked}
          />

          {/* Модальное окно совместимости */}
          <Modal
            closeModal={() => setIsСompatibilityActive(false)}
            isOpen={isСompatibilityActive}
          >
            <div className="text-black-heading">
              {compatibility ? (
                <h3>
                  Подробная статистика совместимости скоро будет доступна!
                </h3>
              ) : (
                <div>
                  <h1>
                    Чтобы получить данные о проценте совместимости необходимо
                    пройти тесты.
                  </h1>
                  <div className="mt-6 text-white">
                    <Link
                      to={"/test"}
                      className="bg-purple-main px-4 py-2 rounded-[30px]"
                    >
                      Перейти к тестам
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Modal>

          {/* Модальное окно для заблокированного пользователя */}
          <Modal
            closeModal={() => setIsBlockedModalOpen(false)}
            isOpen={isBlockedModalOpen}
          >
            <div className="text-center text-black-heading">
              <div className="mb-4">
                <img
                  src="/icons/block.svg"
                  alt="Заблокирован"
                  className="w-12 h-12 mx-auto mb-2"
                />
                <h2 className="text-lg font-semibold">
                  Пользователь заблокирован
                </h2>
              </div>
              <p className="mb-6">
                Вы не можете отправлять сообщения или просматривать
                совместимость с заблокированным пользователем.
              </p>
              <button
                onClick={() => setIsBlockedModalOpen(false)}
                className="bg-purple-main px-6 py-2 rounded-lg text-white"
              >
                Понятно
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default ActionBar;
