import { useNavigate } from "react-router-dom";

interface QuizItemProps {
  quiz: any;
  isCompleted?: boolean;
  isMyProfile?: boolean;
}

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  isCompleted = false,
  isMyProfile = false,
}) => {
  const navigate = useNavigate();

  console.log(quiz);

  const goToQuiz = () => {
    if (!isCompleted && isMyProfile) {
      navigate(`/quiz/${quiz.uuid}`);
    }
  };

  return (
    <div
      className={`
        relative min-w-[140px] h-[100px] rounded-2xl p-3 
        flex flex-col justify-between
        transition-all duration-200
        ${
          isCompleted
            ? "bg-purple-main text-white shadow-sm"
            : "bg-gray-100 text-gray-500 border border-gray-200"
        }
      `}
      onClick={goToQuiz}
    >
      {/* Заголовок квиза */}
      <h3 className="text-[0.875rem] font-semibold leading-[1.125rem] line-clamp-2">
        {quiz.title}
      </h3>

      {/* Описание квиза */}
      <p className="text-[0.75rem] leading-[0.875rem] line-clamp-2">
        {quiz.description}
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

export default QuizItem;
