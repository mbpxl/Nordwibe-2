import { useState } from "react";

const SettingsTip = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClicked = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="relative mt-5">
      {isClicked ? (
        <p className="absolute right-2 bottom-10 text-nowrap bg-purple-progress-content py-1 px-3 rounded-[30px]">
          Переход в Telegram-бота для уведомлений.
        </p>
      ) : null}
      <button
        onClick={handleClicked}
        className="w-8 h-8 flex justify-center items-center bg-[#E1E1F3] rounded-[30px]"
      >
        <img src="/icons/question_icon.svg" alt="?" />
      </button>
    </div>
  );
};

export default SettingsTip;
