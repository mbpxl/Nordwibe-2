import type { ToolTipTypes } from "../../types/ToolTipTypes";

const ToolTip: React.FC<ToolTipTypes> = ({
  isFilledProfile,
  showTooltip,
  handleSetShowToolTip,
}) => {
  return (
    <>
      {!isFilledProfile && showTooltip && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleSetShowToolTip}
          />

          <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg p-3 rounded-lg w-72 text-center">
            <p className="text-sm font-medium">
              Заполните профиль, чтобы быстрее найти соседа!
            </p>
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
          </div>
        </>
      )}
    </>
  );
};

export default ToolTip;
