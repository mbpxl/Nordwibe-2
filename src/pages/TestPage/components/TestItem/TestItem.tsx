import { Link, useNavigate } from "react-router-dom";

interface TestItemProps {
  uuid: string;
  time: number;
  title: string;
  description: string;
  image_url: string;
  isDesktop?: boolean;
  isCompleted?: boolean;
}

const TestItem: React.FC<TestItemProps> = ({
  uuid,
  time,
  title,
  description,
  image_url,
  isDesktop = false,
  isCompleted = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDesktop) {
      navigate(`/test/${uuid}`, { replace: true });
    }
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Link to={`/test/${uuid}`}>
          <div className="flex p-3 gap-x-3 bg-white rounded-[12px] shadow-sm relative hover:shadow-md transition-shadow">
            {/* Бейдж статуса - только для завершенных тестов */}
            {isCompleted && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span>Пройден</span>
                </div>
              </div>
            )}

            <div className="shrink-0">
              <img
                src={image_url}
                alt="quiz_image"
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0 pr-10">
              <p className="text-purple-heading text-[0.625rem] font-medium leading-[0.75rem] mb-1">
                Время: {time} мин
              </p>

              <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[1rem] mb-1">
                {title}
              </h1>

              <p className="text-black-heading text-[0.75rem] font-normal leading-[1.2] line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div
          onClick={handleClick}
          className="flex p-4 gap-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-purple-400 hover:shadow-md transition-all duration-200 relative"
        >
          {/* Бейдж статуса - только для завершенных тестов */}
          {isCompleted && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
                <span>Пройден</span>
              </div>
            </div>
          )}

          <div className="shrink-0">
            <img
              src={image_url}
              alt="quiz_image"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-0 pr-16">
            <p className="text-purple-heading text-sm font-medium mb-2">
              Время прохождения: {time} мин
            </p>

            <h1 className="text-black-heading text-lg font-semibold mb-2 truncate">
              {title}
            </h1>

            <p className="text-black-heading text-sm text-gray-600 line-clamp-2">
              {description}
            </p>

            {/* Простой индикатор для завершенных тестов */}
            {isCompleted && (
              <div className="mt-3">
                <span className="inline-flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Можно пройти заново
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestItem;
