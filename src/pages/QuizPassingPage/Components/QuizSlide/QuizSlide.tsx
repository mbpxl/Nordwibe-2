import { useEffect, useState } from "react";
import QuizProgress from "../QuizProgress/QuizProgress";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import QuizParagraphs from "../QuizTypography/QuizParagraph";
import { useParams } from "react-router-dom";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import EducationSlideHeader from "../../../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import EducationImage from "../../../../shared/Components/Education/EducationsTypography/EducationImage";
import EducationTitle from "../../../../shared/Components/Education/EducationsTypography/EducationTitle";
import { useGetQuiz } from "../../../QuizPage/service/useGetQuiz";
import Loading from "../../../../shared/Components/Loading/Loading";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import { quizMock } from "../../../QuizPage/misc/quizMock";

const QuizSlide = () => {
  // const { data, isLoading } = useGetQuiz();

  // if (isLoading) {
  //   return <Loading />;
  // }

  const [showIntro, setShowIntro] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const { uuid } = useParams<{ uuid: string }>();
  const selectedQuiz = quizMock.find((quiz: any) => quiz.uuid === uuid);
  if (!selectedQuiz) {
    return <Error />;
  }

  useEffect(() => {
    if (!showIntro || !selectedQuiz) return;

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showIntro, selectedQuiz?.uuid]);

  const lessons = selectedQuiz.lessons;

  const slide = lessons[currentSlide];

  if (showIntro) {
    return (
      <Wrapper className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">{selectedQuiz.title}</h1>
        <p className="mb-6 max-w-md">{selectedQuiz.description}</p>

        {selectedQuiz.image_url && (
          <img
            src={baseURLforImages + selectedQuiz.image_url}
            alt={selectedQuiz.title}
            className="w-full max-w-3xs rounded-2xl shadow-lg mb-8"
          />
        )}

        <button
          className="px-10 bg-purple-main text-white py-4 text-xl rounded-2xl"
          onClick={() => setShowIntro(false)}
        >
          Начать квиз
        </button>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="min-h-screen flex flex-col justify-between pb-[30px] items-center">
      <div className="h-[320px] max-w-[344px]">
        <div className="flex flex-col">
          <EducationSlideHeader heading={selectedQuiz.title} unit={"/quiz"} />

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
      />
    </Wrapper>
  );
};

export default QuizSlide;
