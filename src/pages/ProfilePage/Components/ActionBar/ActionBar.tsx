import { useState } from "react";
import MessageUserButton from "./MessageUserButton";
import Сompatibility from "./Сompatibility";
import Modal from "../../../../shared/Components/Modal/Modal";

const ActionBar = () => {
  const [isСompatibilityActive, setIsСompatibilityActive] =
    useState<boolean>(false);

  const handleChange = () => {
    setIsСompatibilityActive((prev) => !prev);
  };

  return (
    <nav className="fixed bottom-0 w-full z-30">
      <div className="bg-white px-4 max-w-[475px] m-auto">
        <div className="flex justify-between items-center gap-5 pt-[0.531rem] pb-[1.094rem] text-white">
          <MessageUserButton />
          <Сompatibility onChange={handleChange} />

          <Modal closeModal={handleChange} isOpen={isСompatibilityActive}>
            модалка йоу
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default ActionBar;
