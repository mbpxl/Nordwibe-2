import { useNavigate } from "react-router-dom";

interface QuizItemDesktopProps {
  quiz: any;
  isCompleted?: boolean;
  isMyProfile?: boolean;
}

const QuizItemDesktop: React.FC<QuizItemDesktopProps> = ({
  quiz,
  isCompleted = false,
  isMyProfile = false,
}) => {
  const navigate = useNavigate();

  const goToQuiz = () => {
    if (!isCompleted && isMyProfile) {
      navigate(`/quiz/${quiz.uuid}`);
    }
  };

  return (
    <div
      className={`
        relative w-[196px] h-[196px] rounded-2xl p-4 
        flex flex-col justify-between
        transition-all duration-200
        ${
          isCompleted
            ? "bg-purple-main text-white shadow-sm"
            : "bg-gray-100 text-gray-500 border border-gray-200"
        }
        hover:shadow-md cursor-pointer
      `}
      onClick={goToQuiz}
    >
      {/* Заголовок квиза */}
      <h3 className="text-base font-semibold leading-5 line-clamp-2">
        {quiz.title}
      </h3>

      {/* Описание квиза */}
      <p className="text-sm leading-4 line-clamp-3 flex-grow my-2">
        {quiz.description}
      </p>

      {/* Дополнительная информация */}
      <div className="flex items-center justify-between">
        {/* Длительность */}
        <span className="text-xs px-2 py-1 rounded-full bg-white/20">
          {quiz.duration} мин
        </span>

        {/* Индикатор статуса */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-80">
            {isCompleted ? "Пройден" : "Не пройден"}
          </span>
          <div
            className={`w-2 h-2 rounded-full ${
              isCompleted ? "bg-green-400" : "bg-gray-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizItemDesktop;
