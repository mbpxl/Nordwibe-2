import { setCompatibilityStyle } from "../../../SearchPage/utils/setCompatibilityStyle";

interface СompatibilityProps {
  onChange: () => void;
  compatibility: number;
  isBlocked?: boolean;
}

const Сompatibility: React.FC<СompatibilityProps> = ({
  onChange,
  compatibility,
  isBlocked = false,
}) => {
  const handleClick = () => {
    if (!isBlocked) {
      onChange();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex max-lg:flex-col lg:gap-12 lg:justify-center items-center ${
        isBlocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <h1 className="text-[0.75rem] lg:text-[20px] text-black-heading font-semibold leading-[0.875rem]">
        Совместимость
      </h1>
      <div
        className={`relative rounded-[12px] mt-0.5 py-1 px-2 lg:py-2 lg:px-3 lg:text-nowrap text-white ${
          isBlocked ? "bg-gray-400" : setCompatibilityStyle(compatibility)
        }`}
      >
        <h2>{compatibility ? compatibility + " %" : "???"}</h2>
        {!isBlocked && compatibility > 0 && (
          <span className="absolute top-[-3px] right-0 w-3 h-3 bg-purple-main rounded-[50%]"></span>
        )}
      </div>
    </div>
  );
};

export default Сompatibility;
