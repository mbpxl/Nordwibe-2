import { useEffect, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { usePostTest } from "../TestPassingPage/service/usePostTest";
import type { SelectedAnswer, ScaleMap } from "./types/test";
import { calculateResult } from "./utils/calculateResult";

type LocationState = {
  answers?: SelectedAnswer[];
  scaleMap?: ScaleMap;
};

const ResultPage = () => {
  const { state } = useLocation();
  const { uuid } = useParams<{ uuid: string }>();
  const { mutate, isSuccess, isError } = usePostTest();

  const answers = (state as LocationState)?.answers;
  const scaleMap = (state as LocationState)?.scaleMap;

  if (!answers || !scaleMap) {
    return (
      <div className="p-4 text-center">
        <div>
          <h1 className="text-xl font-bold">Нет данных для результата</h1>
          <Link to={`/test/${uuid}`} className="text-purple-main underline">
            Пройти тест
          </Link>
        </div>
      </div>
    );
  }

  const result = calculateResult(answers, scaleMap);

  const postedRef = useRef(false);
  useEffect(() => {
    if (postedRef.current) return;
    postedRef.current = true;

    const payload = answers.map((a) => ({
      question_id: a.questionId,
      answer_id: a.answerId,
    }));

    mutate(payload);
  }, [answers, mutate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      {state.isMainTest ? (
        <div>
          <h1 className="text-2xl font-bold text-purple-main mb-4">Готово!</h1>
          <p className="text-lg">
            Запускаем поиск человека, с которым тебе будет по-настоящему
            комфортно.
          </p>
          <div className="mt-6 text-white">
            <Link to={"/"} className="bg-purple-main px-4 py-2 rounded-[30px]">
              На главную
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-purple-main mb-4">
            {result.title}
          </h1>
          <p className="text-lg">{result.description}</p>

          <div className="mt-6">
            {isSuccess && (
              <p className="text-green-600">Результат успешно сохранён 🎉</p>
            )}
            {isError && (
              <p className="text-red-600">Ошибка при сохранении результата</p>
            )}
          </div>

          <div className="mt-6 text-white">
            <Link to={"/"} className="bg-purple-main px-4 py-2 rounded-[30px]">
              На главную
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
