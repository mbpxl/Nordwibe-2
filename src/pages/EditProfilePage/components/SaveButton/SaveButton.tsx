import React from "react";

type SaveButton = {
  isDisabled: boolean;
  isPending: boolean;
  onSubmit: (data: any) => void;
};

const SaveButton: React.FC<SaveButton> = ({
  isDisabled,
  isPending,
  onSubmit,
}) => {
  return (
    <button
      onClick={onSubmit}
      disabled={isDisabled || isPending}
      className={`w-full mt-16 text-center ${
        isPending ? "bg-gray-400" : "bg-purple-main"
      } py-2 text-white rounded-4xl text-[1.125rem] font-semibold leading-5`}
    >
      Сохранить изменения
    </button>
  );
};

export default SaveButton;
