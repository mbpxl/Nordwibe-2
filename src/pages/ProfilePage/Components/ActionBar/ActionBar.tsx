import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";
import { Link } from "react-router-dom";

const ActionBar: React.FC<{ companiodId: string; compatibility: number }> = ({
  companiodId,
  compatibility,
}) => {
  const [isСompatibilityActive, setIsСompatibilityActive] =
    useState<boolean>(false);

  const handleChange = () => {
    setIsСompatibilityActive((prev) => !prev);
  };

  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-4 max-w-[475px] m-auto">
        <div className="flex justify-between items-center gap-5 pt-[0.531rem] pb-[1.094rem] text-white">
          <MessageUserButton companionId={companiodId} />
          <Сompatibility
            onChange={handleChange}
            compatibility={compatibility}
          />

          <Modal closeModal={handleChange} isOpen={isСompatibilityActive}>
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
        </div>
      </div>
    </nav>
  );
};

export default ActionBar;
