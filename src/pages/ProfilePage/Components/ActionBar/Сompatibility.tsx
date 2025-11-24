import { setCompatibilityStyle } from "../../../SearchPage/utils/setCompatibilityStyle";

const Сompatibility: React.FC<{
  onChange: () => void;
  compatibility: number;
}> = ({ onChange, compatibility }) => {
  return (
    <div onClick={onChange} className="flex flex-col items-center">
      <h1 className="text-[0.75rem] text-black-heading font-semibold leading-[0.875rem]">
        Совместимость
      </h1>
      <div
        className={`relative rounded-[12px] mt-0.5 py-1 px-2 text-white ${setCompatibilityStyle(
          compatibility
        )}`}
      >
        <h2>{compatibility ? compatibility + " %" : "???"}</h2>
        <span className="absolute top-[-3px] right-0 w-3 h-3 bg-purple-main rounded-[50%]"></span>
      </div>
    </div>
  );
};

export default Сompatibility;
