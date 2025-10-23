import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TestAnswersList from "../TestAnswersList/TestAnswersList";
import EducationSlideHeader from "../../../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import EducationImage from "../../../../shared/Components/Education/EducationsTypography/EducationImage";
import EducationTitle from "../../../../shared/Components/Education/EducationsTypography/EducationTitle";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import type {
  Scale,
  ScaleMap,
  SelectedAnswer,
} from "../../../TestResultPage/types/test";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import { testMockData } from "../../../TestPage/misc/testData";
import QuizProgress from "../../../QuizPassingPage/Components/QuizProgress/QuizProgress";

const TestSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, SelectedAnswer>
  >({});

  const { uuid } = useParams<{ uuid: string }>();
  const selectedTest = testMockData.find((test: any) => test.uuid == uuid);
  if (!selectedTest || !selectedTest.questions) return <Error />;

  const questions = selectedTest.questions;
  const slide = questions[currentSlide];

  // Карта шкал на основе позиций вопросов:
  // 1,3,5 -> EXTRAVERSION ; 2,6,7 -> NEATNESS ; 4,8,9,10 -> LOYALTY
  const scaleMap: ScaleMap = useMemo(() => {
    const map: ScaleMap = {};
    const toScale = (pos: number): Scale => {
      if ([1, 3, 5].includes(pos)) return "EXTRAVERSION";
      if ([2, 6, 7].includes(pos)) return "NEATNESS";
      return "LOYALTY"; // 4,8,9,10
    };
    questions.forEach((q: any, idx: number) => {
      map[q.uuid] = toScale(idx + 1);
    });
    return map;
  }, [questions]);

  const handleSelectAnswer = (
    questionUuid: string,
    answerUuid: string,
    value: number
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionUuid]: { questionId: questionUuid, answerId: answerUuid, value },
    }));
  };

  const isAnswerSelected = !!selectedAnswers[slide.uuid];
  //@ts-ignore
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  return (
    <Wrapper className="min-h-screen flex flex-col justify-between pb-[30px] items-center">
      <div className="h-[320px] max-w-[344px] w-full">
        <div className="flex flex-col">
          <EducationSlideHeader heading={selectedTest.title} unit={"/test"} />

          <EducationImage image_url={baseURLforImages + slide.image_url} />

          <EducationTitle title={slide.question} />
          <TestAnswersList
            answers={slide.answers}
            questionUuid={slide.uuid}
            selectedAnswerUuid={selectedAnswers[slide.uuid]?.answerId}
            onSelect={handleSelectAnswer}
          />

          <QuizProgress
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            quizData={questions}
            uuid={uuid!}
            answers={Object.values(selectedAnswers)}
            scaleMap={scaleMap}
            isTest
            disabled={!isAnswerSelected}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default TestSlide;
