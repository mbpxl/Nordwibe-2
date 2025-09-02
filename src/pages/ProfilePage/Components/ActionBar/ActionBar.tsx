import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";

const ActionBar: React.FC<{ companiodId: string }> = ({ companiodId }) => {
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
          <Сompatibility onChange={handleChange} />

          <Modal closeModal={handleChange} isOpen={isСompatibilityActive}>
            <div className="text-black-heading">
              <h3>Процент совместимости скоро будет доступен!</h3>
            </div>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default ActionBar;
