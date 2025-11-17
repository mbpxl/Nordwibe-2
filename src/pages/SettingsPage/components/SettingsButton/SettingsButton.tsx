import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../../shared/Components/Modal/Modal";
import { useLogout } from "../../service/useLogout";

export type SettingsButtonTypes = {
  title:
    | "Уведомление в Telegram-боте"
    | "Сменить номер телефона"
    | "Настройки приватности"
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
  isRed,
  isPhoneChange,
  to,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);

  const { mutate: logout, isPending: isPendingLogout } = useLogout();

  const commonStyles = `w-full py-2 pl-5 text-[0.875rem] font-semibold leading-4 mt-5 rounded-[30px] text-[#E1E1F3] text-left`;

  //todo const withBorder =
  //   title !== "Часто задаваемые вопросы" && title !== "Выйти из аккаунта";

  const handleLogout = () => {
    logout();
  };

  const handleClick = () => {
    if (isPhoneChange) {
      setShowInput((prev) => !prev);
    } else if (title === "Уведомление в Telegram-боте") {
      setShowModal((prev) => !prev);
    } else if (title === "Выйти из аккаунта") {
      setShowModal(true);
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
              isPendingLogout
                ? "bg-gray-400"
                : isRed
                ? "bg-[#EC5959]"
                : "bg-purple-sub-button"
            }`}
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
            {title === "Выйти из аккаунта" ? (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-4 text-black-heading">
                  Вы точно хотите выйти?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="bg-[#EC5959] px-4 py-2 rounded-lg text-white"
                  >
                    Да
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-purple-sub-button px-4 py-2 rounded-lg text-[#E1E1F3]"
                  >
                    Нет
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-lg">В разработке</h2>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default SettingsButton;
