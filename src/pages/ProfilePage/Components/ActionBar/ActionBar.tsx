import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";
import { rankingMock } from "../../../SearchPage/misc/rankingMock";

const ActionBar: React.FC<{ companiodId: string; compatibility: number }> = ({
  companiodId,
  compatibility,
}) => {
  const [isСompatibilityActive, setIsСompatibilityActive] =
    useState<boolean>(false);

  const handleChange = () => {
    setIsСompatibilityActive((prev) => !prev);
  };

  const compatibility2 = rankingMock.find(
    (user) => user.user_id == companiodId
  );

  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-4 max-w-[475px] m-auto">
        <div className="flex justify-between items-center gap-5 pt-[0.531rem] pb-[1.094rem] text-white">
          <MessageUserButton companionId={companiodId} />
          <Сompatibility
            onChange={handleChange}
            compatibility={compatibility || compatibility2?.score!}
          />

          <Modal closeModal={handleChange} isOpen={isСompatibilityActive}>
            <div className="text-black-heading">
              <h3>Подробная статистика совместимости скоро будет доступна!</h3>
            </div>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default ActionBar;
