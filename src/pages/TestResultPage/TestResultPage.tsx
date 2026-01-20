import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { usePostTest } from "../TestPassingPage/service/usePostTest";
import type { SelectedAnswer, ScaleMap } from "./types/test";
import { useGetTests } from "../TestPage/service/useGetTests";
import { calculateTestResult } from "../../shared/utils/testResults";

type LocationState = {
  answers?: SelectedAnswer[];
  scaleMap?: ScaleMap;
  testId?: string;
};

const ResultPage = () => {
  const { state } = useLocation();
  const { mutate, isSuccess: isPostSuccess } = usePostTest();
  const { data: tests } = useGetTests();

  const answers = (state as LocationState)?.answers;
  const scaleMap = (state as LocationState)?.scaleMap;
  const testId = (state as LocationState)?.testId;

  const [result, setResult] = useState<{
    testTitle: string;
    test_title: string;
    description: string;
    imageUrl?: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const postedRef = useRef(false);

  useEffect(() => {
    if (!answers || !scaleMap || postedRef.current) return;

    postedRef.current = true;
    setIsProcessing(true);

    const payload = answers.map((a) => ({
      question_id: a.questionId,
      answer_id: a.answerId,
    }));

    mutate(payload);
  }, [answers, mutate, scaleMap]);

  useEffect(() => {
    if (!isPostSuccess) return;

    if (!testId || !tests?.length || !answers) return;

    const currentTest = tests.find((test: any) => test.uuid === testId);
    if (!currentTest) return;

    if (
      currentTest.is_important ||
      currentTest.uuid === "cfd48889-06ca-4edf-832e-248b7ed534b2"
    ) {
      setIsProcessing(false);
      return;
    }

    try {
      const userTestAnswers: [string, string][] = answers.map((a) => [
        a.questionId,
        a.answerId,
      ]);
      const calculatedResult = calculateTestResult(
        currentTest,
        userTestAnswers,
      );

      if (calculatedResult.letter !== "—" && calculatedResult.description) {
        setResult({
          testTitle: currentTest.title,
          test_title: calculatedResult.test_title,
          description: calculatedResult.description,
          imageUrl: calculatedResult.imageUrl,
        });
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("Error calculating test result:", error);
      setIsProcessing(false);
    }
  }, [isPostSuccess, testId, tests, answers]);

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

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="p-4 text-center">
          <div>
            <h1 className="text-xl font-bold">Высчитываем результат...</h1>
            <p className="text-purple-main mt-2">Пожалуйста, подождите</p>
          </div>
        </div>
      </div>
    );
  }

  if ((state as any)?.isMainTest) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
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
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="bg-white rounded-2xl w-full max-w-md mx-2 p-5 sm:p-6">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {result.testTitle}
            </h3>

            <div className="bg-purple-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg font-semibold text-purple-800">
                {result.test_title}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {result.description}
              </p>
            </div>

            <Link
              to="/profile"
              className="block w-full bg-purple-main text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-center"
            >
              <span className="text-base font-medium">В профиль</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="p-4 text-center">
        <div>
          <h1 className="text-xl font-bold">Высчитываем результат!</h1>
          <h2 className="text-purple-main underline">
            посмотреть его можно у себя в профиле
          </h2>
          <div className="mt-6 text-white">
            <Link
              to={"/profile"}
              className="bg-purple-main px-4 py-2 rounded-[30px]"
            >
              В профиль
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
