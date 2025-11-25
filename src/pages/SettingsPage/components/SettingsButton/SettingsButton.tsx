import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../../shared/Components/Modal/Modal";
import { useLogout } from "../../service/useLogout";
import { useDeleteAccount } from "../../../ProfilePage/service/useDeleteAccount";

export type SettingsButtonTypes = {
  title:
    | "Уведомление в Telegram-боте"
    | "Сменить номер телефона"
    | "Настройки приватности"
    | "Чёрный список"
    | "О приложении"
    | "Часто задаваемые вопросы"
    | "Удалить аккаунт"
    | "Выйти из аккаунта";
  isRed?: boolean;
  isPhoneChange?: boolean;
  to?: string;
};

const SettingsButton: React.FC<SettingsButtonTypes> = ({
  title,
  isRed = false,
  isPhoneChange,
  to,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "logout" | "deleteAccount" | "telegram"
  >("logout");
  const [showInput, setShowInput] = useState<boolean>(false);

  const { mutate: logout, isPending: isPendingLogout } = useLogout();
  const { mutate: deleteAccount, isPending: isPendingDelete } =
    useDeleteAccount();

  const commonStyles = `w-full py-2 pl-5 text-[0.875rem] font-semibold leading-4 mt-5 rounded-[30px] text-[#E1E1F3] text-left`;

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  const handleClick = () => {
    if (isPhoneChange) {
      setShowInput((prev) => !prev);
    } else if (title === "Уведомление в Telegram-боте") {
      setModalType("telegram");
      setShowModal(true);
    } else if (title === "Выйти из аккаунта") {
      setModalType("logout");
      setShowModal(true);
    } else if (title === "Удалить аккаунт") {
      setModalType("deleteAccount");
      setShowModal(true);
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case "logout":
        return (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4 text-black-heading">
              Вы точно хотите выйти?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                disabled={isPendingLogout}
                className="bg-[#EC5959] px-4 py-2 rounded-lg text-white disabled:opacity-50"
              >
                {isPendingLogout ? "Выход..." : "Да"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-sub-button px-4 py-2 rounded-lg text-[#E1E1F3]"
              >
                Нет
              </button>
            </div>
          </div>
        );

      case "deleteAccount":
        return (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4 text-black-heading">
              Вы точно хотите удалить аккаунт?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Это действие невозможно отменить. Все ваши данные будут удалены
              безвозвратно.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAccount}
                disabled={isPendingDelete}
                className="bg-[#EC5959] px-4 py-2 rounded-lg text-white disabled:opacity-50"
              >
                {isPendingDelete ? "Удаление..." : "Да, удалить"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-sub-button px-4 py-2 rounded-lg text-[#E1E1F3]"
              >
                Отмена
              </button>
            </div>
          </div>
        );

      case "telegram":
      default:
        return <h2 className="text-lg">В разработке</h2>;
    }
  };

  return (
    <div className="w-full">
      {to ? (
        <Link className={`${commonStyles} bg-purple-sub-button block`} to={to}>
          <h1 className="text-[#E1E1F3]">{title}</h1>
        </Link>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={`${commonStyles} ${
              isPendingLogout || isPendingDelete
                ? "bg-gray-400"
                : isRed
                ? "bg-[#EC5959]"
                : "bg-purple-sub-button"
            }`}
            disabled={isPendingLogout || isPendingDelete}
          >
            {title}
          </button>

          {isPhoneChange && showInput && (
            <div className="mt-3 pl-5">
              <input
                type="text"
                placeholder="Введите новый номер"
                className="w-full p-2 rounded-lg bg-[#2E2E48] text-[#E1E1F3] outline-none"
              />
              <button>ok</button>
            </div>
          )}

          <Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
            {getModalContent()}
          </Modal>
        </>
      )}
    </div>
  );
};

export default SettingsButton;
