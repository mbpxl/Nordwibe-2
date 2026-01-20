import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useIsDesktop } from "../../../../shared/hooks/useIsDesktop";
import { CompatibilityDetailsModal } from "./CompatibilityDetailsModal";

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
  const isDesktop = useIsDesktop();

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
    } else if (isDesktop) {
      navigate("/chat/" + companionId);
    } else {
      navigate("/chats/" + companionId);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full z-30 lg:static lg:z-auto">
        <div className="bg-white px-4 max-w-[475px] m-auto lg:bg-transparent lg:p-0 lg:max-w-none">
          <div className="flex justify-between items-center gap-5 pt-[0.531rem] pb-[1.094rem] text-white lg:flex-col-reverse lg:items-stretch lg:gap-3">
            <MessageUserButton
              onClick={handleWriteMessage}
              isBlocked={isBlocked}
            />
            <Сompatibility
              onChange={handleCompatibilityChange}
              compatibility={compatibility}
              isBlocked={isBlocked}
            />
          </div>
        </div>
      </nav>

      <Modal
        closeModal={() => setIsСompatibilityActive(false)}
        isOpen={isСompatibilityActive}
      >
        <div className="text-black-heading">
          {compatibility ? (
            <CompatibilityDetailsModal
              companionId={companionId}
              overallPercentage={compatibility}
            />
          ) : (
            <div>
              <h1>
                Чтобы получить данные о проценте совместимости необходимо пройти
                тесты.
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
            <h2 className="text-lg font-semibold">Пользователь заблокирован</h2>
          </div>
          <p className="mb-6">
            Вы не можете отправлять сообщения или просматривать совместимость с
            заблокированным пользователем.
          </p>
          <button
            onClick={() => setIsBlockedModalOpen(false)}
            className="bg-purple-main px-6 py-2 rounded-lg text-white"
          >
            Понятно
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ActionBar;
