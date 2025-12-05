import { useNavigate } from "react-router-dom";

interface TestsItemProps {
  test: any;
  isCompleted?: boolean;
  isMyProfile?: boolean;
  onResultClick?: () => void;
}

const TestsItem: React.FC<TestsItemProps> = ({
  test,
  isCompleted = false,
  isMyProfile = false,
  onResultClick,
}) => {
  const navigate = useNavigate();
  const isOtherProfile = !isMyProfile;

  const handleClick = () => {
    if (isMyProfile && !isCompleted) {
      navigate(`/test/${test.uuid}`);
    } else if (isOtherProfile && isCompleted && onResultClick) {
      onResultClick();
    }
  };

  const cursorStyle =
    (isMyProfile && !isCompleted) ||
    (isOtherProfile && isCompleted && onResultClick)
      ? "cursor-pointer hover:opacity-90"
      : "";

  return (
    <div
      className={`relative min-w-[140px] h-[100px] rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 ${
        isCompleted
          ? "bg-purple-main text-white shadow-sm"
          : "bg-gray-100 text-gray-500 border border-gray-200"
      } ${cursorStyle}`}
      onClick={handleClick}
    >
      {/* Заголовок теста */}
      <h3 className="text-[0.875rem] font-semibold leading-[1.125rem] line-clamp-2">
        {test.title}
      </h3>

      {/* Описание теста */}
      <p className="text-[0.75rem] leading-[0.875rem] line-clamp-2">
        {test.description}
      </p>

      {/* Индикатор статуса */}
      <div className="flex justify-between items-center">
        <span className="text-[0.625rem] opacity-80">
          {isCompleted ? "Пройден" : "Не пройден"}
        </span>

        {/* Иконка статуса */}
        <div
          className={`w-2 h-2 rounded-full ${
            isCompleted ? "bg-green-400" : "bg-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default TestsItem;
