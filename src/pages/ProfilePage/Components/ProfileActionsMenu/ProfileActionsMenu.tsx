import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../shared/Components/Modal/Modal";

interface ProfileActionsMenuProps {
  isMyProfile?: boolean;
  onShare: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  isBlocking?: boolean;
  isUnblocking?: boolean;
  isBlocked?: boolean;
  userId: string;
}

const ProfileActionsMenu = ({
  isMyProfile = false,
  onShare,
  onBlock,
  onUnblock,
  isBlocking = false,
  isUnblocking = false,
  isBlocked = false,
  userId,
}: ProfileActionsMenuProps) => {
  const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
  const [showUnblockModal, setShowUnblockModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);
      toast.success("Скопировано в буфер обмена");
      setTimeout(() => {
        setIsCopied(false);
        onShare();
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleBlockClick = () => {
    setShowBlockModal(true);
  };

  const handleUnblockClick = () => {
    setShowUnblockModal(true);
  };

  const handleConfirmBlock = () => {
    onBlock?.();
    setShowBlockModal(false);
  };

  const handleConfirmUnblock = () => {
    onUnblock?.();
    setShowUnblockModal(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleShare}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
      >
        <img src="/icons/link.svg" alt="Поделиться" className="w-5 h-5" />
        <span className="text-gray-900">
          {isCopied ? "Скопировано!" : "Поделиться профилем"}
        </span>
      </button>

      {!isMyProfile && (
        <>
          {isBlocked ? (
            <button
              onClick={handleUnblockClick}
              disabled={isUnblocking}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-green-600 disabled:opacity-50"
            >
              <img
                src="/icons/unblock.svg"
                alt="Разблокировать"
                className="w-5 h-5"
              />
              <span>
                {isUnblocking ? "Разблокировка..." : "Разблокировать"}
              </span>
            </button>
          ) : (
            <button
              onClick={handleBlockClick}
              disabled={isBlocking}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-red-600 disabled:opacity-50"
            >
              <img
                src="/icons/block.svg"
                alt="Заблокировать"
                className="w-5 h-5"
              />
              <span>{isBlocking ? "Блокировка..." : "Заблокировать"}</span>
            </button>
          )}
        </>
      )}

      {/* Модальное окно для блокировки */}
      <Modal
        isOpen={showBlockModal}
        closeModal={() => setShowBlockModal(false)}
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4 text-black-heading">
            Вы точно хотите заблокировать этого пользователя?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmBlock}
              className="bg-[#EC5959] px-4 py-2 rounded-lg text-white disabled:opacity-50"
            >
              Да
            </button>
            <button
              onClick={() => setShowBlockModal(false)}
              className="bg-purple-sub-button px-4 py-2 rounded-lg text-[#E1E1F3]"
            >
              Нет
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно для разблокировки */}
      <Modal
        isOpen={showUnblockModal}
        closeModal={() => setShowUnblockModal(false)}
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4 text-black-heading">
            Вы точно хотите разблокировать этого пользователя?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmUnblock}
              className="bg-green-500 px-4 py-2 rounded-lg text-white disabled:opacity-50"
            >
              Да
            </button>
            <button
              onClick={() => setShowUnblockModal(false)}
              className="bg-purple-sub-button px-4 py-2 rounded-lg text-[#E1E1F3]"
            >
              Нет
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileActionsMenu;
