import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { usePostTest } from "../TestPassingPage/service/usePostTest";
import type { SelectedAnswer, ScaleMap } from "./types/test";

type LocationState = {
  answers?: SelectedAnswer[];
  scaleMap?: ScaleMap;
};

const ResultPage = () => {
  const { state } = useLocation();
  //todo: const { uuid } = useParams<{ uuid: string }>();
  const { mutate } = usePostTest();

  const answers = (state as LocationState)?.answers;
  const scaleMap = (state as LocationState)?.scaleMap;

  if (!answers || !scaleMap) {
    return (
      <div className="p-4 text-center">
        <div>
          <h1 className="text-xl font-bold">Высчитываем результат!</h1>
          <h2 className="text-purple-main underline">
            посмотреть его можно у себя в профиле
          </h2>
        </div>
      </div>
    );
  }


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
        <div className="p-4 text-center">
          <div>
            <h1 className="text-xl font-bold">Высчитываем результат!</h1>
            <h2 className="text-purple-main underline">
              посмотреть его можно у себя в профиле
            </h2>
            <div className="mt-6 text-white">
              <Link to={"/profile"} className="bg-purple-main px-4 py-2 rounded-[30px]">
                В профиль
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
