import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../shared/Components/Loading/Loading";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import EducationSlideHeader from "../../../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import EducationImage from "../../../../shared/Components/Education/EducationsTypography/EducationImage";
import EducationTitle from "../../../../shared/Components/Education/EducationsTypography/EducationTitle";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import { useGetQuiz } from "../../../QuizPage/service/useGetQuiz";
import QuizProgress from "../QuizProgress/QuizProgress";
import QuizParagraphs from "../QuizTypography/QuizParagraph";
import { useGetCompletedQuizes } from "../../../QuizPage/service/useGetCompletedQuizes";

interface QuizSlideProps {
  isDesktop?: boolean;
}

const QuizSlide = ({ isDesktop = false }: QuizSlideProps) => {
  const { data, isLoading, isError } = useGetQuiz();
  const { data: completedAnswers } = useGetCompletedQuizes(); // Добавляем хук

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Error />;
  }

  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { uuid } = useParams<{ uuid: string }>();
  const selectedQuiz = data.find((quiz: any) => quiz.uuid === uuid);

  if (!selectedQuiz) {
    return <Error />;
  }

  // Проверяем, пройден ли квиз
  const isQuizCompleted = useMemo(() => {
    if (!selectedQuiz || !completedAnswers) return false;
    const quizQuestions = selectedQuiz.quiz[0].questions.map(
      (q: any) => q.uuid
    );
    const completedQuestionIds = new Set(
      completedAnswers.map((a: any) => a.question_id)
    );
    return quizQuestions.every((qid: string) => completedQuestionIds.has(qid));
  }, [selectedQuiz, completedAnswers]);

  useEffect(() => {
    if (!showIntro || !selectedQuiz) return;

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showIntro, selectedQuiz?.uuid]);

  const lessons = selectedQuiz.lessons;
  const slide = lessons[currentSlide];

  // Desktop версия интро
  if (isDesktop && showIntro) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl">
        {isQuizCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            Пройден
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {selectedQuiz.title}
        </h1>
        <p className="text-gray-600 mb-6 max-w-lg">
          {selectedQuiz.description}
        </p>

        {selectedQuiz.image_url && (
          <img
            src={baseURLforImages + selectedQuiz.image_url}
            alt={selectedQuiz.title}
            className="w-48 h-48 object-cover rounded-xl shadow-lg mb-8"
          />
        )}

        <button
          className="px-8 py-3 bg-purple-main text-white text-lg font-medium rounded-lg hover:bg-purple-600 transition-colors"
          onClick={() => setShowIntro(false)}
        >
          {isQuizCompleted ? "Просмотреть материалы" : "Начать квиз"}
        </button>
      </div>
    );
  }

  // Мобильная версия интро
  if (showIntro) {
    return (
      <Wrapper className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        {isQuizCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            Пройден
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">{selectedQuiz.title}</h1>
        <p className="mb-6 max-w-md">{selectedQuiz.description}</p>

        {selectedQuiz.image_url && (
          <img
            src={baseURLforImages + selectedQuiz.image_url}
            alt={selectedQuiz.title}
            className="w-full max-w-44 rounded-2xl shadow-lg mb-8"
          />
        )}

        <button
          className="px-10 bg-purple-main text-white py-4 text-xl rounded-2xl"
          onClick={() => setShowIntro(false)}
        >
          {isQuizCompleted ? "Просмотреть" : "Начать квиз"}
        </button>
      </Wrapper>
    );
  }

  // Desktop версия слайдов
  if (isDesktop) {
    return (
      <div className="h-full flex flex-col">
        {/* Заголовок с меткой о прохождении */}
        <div className="px-6 pt-6 flex-shrink-0 flex justify-between items-center">
          <EducationSlideHeader
            heading={selectedQuiz.title}
            unit={"/quiz"}
            isDesktop={true}
          />
          {isQuizCompleted && (
            <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              Пройден
            </div>
          )}
        </div>

        {/* Контент с прокруткой */}
        <div className="flex-1 overflow-y-auto px-6">
          <EducationImage
            image_url={baseURLforImages + slide.image_url}
            isDesktop={true}
          />
          <EducationTitle title={slide.title} isDesktop={true} />
          <QuizParagraphs
            paragraphs={slide.text
              .split(". ")
              .map((i: any) => i.replace(/\.*$/, "."))}
            isDesktop={true}
          />
        </div>

        {/* Прогресс и кнопки */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200">
          <QuizProgress
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            quizData={lessons}
            uuid={uuid!}
            isDesktop={true}
            isQuizCompleted={isQuizCompleted}
          />
        </div>
      </div>
    );
  }

  // Мобильная версия слайдов
  return (
    <Wrapper className="min-h-screen flex flex-col justify-between pb-[30px] items-center">
      <div className="h-[320px] max-w-[344px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <EducationSlideHeader heading={selectedQuiz.title} unit={"/quiz"} />
            {isQuizCompleted && (
              <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Пройден
              </div>
            )}
          </div>
          <EducationImage image_url={baseURLforImages + slide.image_url} />
          <EducationTitle title={slide.title} />
          <QuizParagraphs
            paragraphs={slide.text
              .split(". ")
              .map((i: any) => i.replace(/\.*$/, "."))}
          />
        </div>
      </div>

      <QuizProgress
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        quizData={lessons}
        uuid={uuid!}
        isQuizCompleted={isQuizCompleted}
      />
    </Wrapper>
  );
};

export default QuizSlide;
