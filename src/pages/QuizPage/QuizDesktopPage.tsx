import { useParams } from "react-router-dom";
import QuizSlide from "../QuizPassingPage/Components/QuizSlide/QuizSlide";
import QuizList from "./Components/QuizList/QuizList";

const QuizDesktopPage = () => {
  const { uuid } = useParams<{ uuid?: string }>();

  return (
    <div className="max-w-[1340px] mx-auto px-4 py-6">
      <div className="flex gap-8" style={{ height: "calc(100vh - 140px)" }}>
        {/* Левая колонка - список квизов */}
        <div className="w-full max-w-[552px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
            <QuizList isDesktop={true} />
          </div>
        </div>

        {/* Правая колонка - квиз */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
            {uuid ? (
              <QuizSlide key={uuid} isDesktop={true} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                <h3 className="text-xl font-medium mb-2">Выберите квиз</h3>
                <p className="text-gray-500 text-center">
                  Выберите квиз из списка слева, чтобы начать изучение
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDesktopPage;
