import { useState } from "react";
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

const QuizSlide = () => {
  const { data, isLoading } = useGetQuiz();

  if (isLoading) {
    return <Loading />;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const { uuid } = useParams<{ uuid: string }>();
  const selectedQuiz = data.find((quiz: any) => quiz.uuid === uuid);
  if (!selectedQuiz) {
    return <Error />;
  }

  const lessons = selectedQuiz.lessons;

  const slide = lessons[currentSlide];

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
