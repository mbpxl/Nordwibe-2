import { Link, useNavigate } from "react-router-dom";
import Continue from "../../../AuthPage/Components/Continue/Continue";
import type { QuizCardType } from "../../../QuizPassingPage/types/quizDataTypes";

const QuizItem: React.FC<QuizCardType> = ({
  uuid,
  time,
  title,
  description,
  image_url,
  isDesktop = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDesktop) {
      navigate(`/quiz/${uuid}`, { replace: true });
    }
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Link
          className="flex p-3 gap-x-3 bg-white rounded-[12px]"
          to={`/quiz/${uuid}`}
        >
          <div className="shrink-0">
            <img src={image_url} alt="quiz_image" />
          </div>
          <div className="max-w-[350.7px]">
            <p className="text-purple-heading text-[0.625rem] font-medium leading-[0.75rem] mb-1 max-[334px]:text-[0.58rem] max-[334px]:leading-[0.696rem]">
              Время прохождения: {time} мин
            </p>
            <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[1rem] mb-1 max-[334px]:text-[0.78rem] max-[334px]:leading-[0.888rem]">
              {title}
            </h1>
            <p className="h-[65px] text-black-heading text-[0.75rem] font-normal leading-[0.75rem] max-[334px]:text-[0.635rem] max-[334px]:mb-[0.625rem]">
              {description}
            </p>
            <div className="text-white">
              <Continue
                title={"Перейти"}
                handleNext={() => navigate(`/quiz/${uuid}`)}
                isQuizButton
              />
            </div>
          </div>
        </Link>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div
          onClick={handleClick}
          className="flex p-4 gap-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-purple-400 hover:shadow-md transition-all duration-200"
        >
          <div className="shrink-0">
            <img
              src={image_url}
              alt="quiz_image"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-purple-heading text-xs font-medium mb-1">
              Время прохождения: {time} мин
            </p>
            <h1 className="text-black-heading text-lg font-semibold mb-2 truncate">
              {title}
            </h1>
            <p className="text-black-heading text-sm line-clamp-2 mb-3">
              {description}
            </p>
            <button
              className="bg-purple-main text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/quiz/${uuid}`);
              }}
            >
              Перейти
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizItem;
