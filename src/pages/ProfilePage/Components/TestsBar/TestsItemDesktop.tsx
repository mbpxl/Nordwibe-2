import { useNavigate } from "react-router-dom";

const TestsItemDesktop = ({ test, isCompleted, isMyProfile }: any) => {
  const navigate = useNavigate();

  const goToTests = () => {
    if (!isCompleted && isMyProfile) {
      navigate(`/test/${test.uuid}`);
    }
  };

  return (
    <div
      className={`
        w-[196px] h-[196px] rounded-2xl p-4 cursor-pointer
        flex flex-col justify-between
        transition-all duration-200
        ${
          isCompleted
            ? "bg-purple-main text-white shadow-md"
            : "bg-gray-100 text-gray-500 border border-gray-200"
        }
      `}
      onClick={goToTests}
    >
      <h3 className="text-base font-semibold line-clamp-2">{test.title}</h3>

      <p className="text-sm line-clamp-3">{test.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs opacity-80">
          {isCompleted ? "Пройден" : "Не пройден"}
        </span>

        <div
          className={`w-3 h-3 rounded-full ${
            isCompleted ? "bg-green-400" : "bg-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default TestsItemDesktop;
