// TestSlide.tsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TestAnswersList from "../TestAnswersList/TestAnswersList";
import TestNext from "../TestNext/TestNext";
import EducationSlideHeader from "../../../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import EducationImage from "../../../../shared/Components/Education/EducationsTypography/EducationImage";
import EducationTitle from "../../../../shared/Components/Education/EducationsTypography/EducationTitle";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import AnimatedStepWrapper from "../../../../shared/Components/AnimatedStepWrapper/AnimatedStepWrapper";
import { useGetTests } from "../../../TestPage/service/useGetTests";
import Loading from "../../../../shared/Components/Loading/Loading";
import type {
  Scale,
  ScaleMap,
  SelectedAnswer,
} from "../../../TestResultPage/types/test";

const TestSlide = () => {
  const { data, isLoading, isError } = useGetTests();
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Теперь храним: key=questionUuid => { questionId, answerId, value }
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, SelectedAnswer>
  >({});

  const { uuid } = useParams<{ uuid: string }>();
  const selectedTest = data.find((test: any) => test.uuid == uuid);
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

          <EducationImage
            image_url={"https://3133319-bo35045.twc1.net/" + slide.image_url}
          />

          <AnimatedStepWrapper stepKey={currentSlide} direction={direction}>
            <EducationTitle title={slide.question} />
            <TestAnswersList
              answers={slide.answers}
              questionUuid={slide.uuid}
              selectedAnswerUuid={selectedAnswers[slide.uuid]?.answerId}
              onSelect={handleSelectAnswer}
            />
          </AnimatedStepWrapper>

          <TestNext
            setCurrentSlide={setCurrentSlide}
            isLast={currentSlide === questions.length - 1}
            disabled={!isAnswerSelected}
            answers={Object.values(selectedAnswers)}
            scaleMap={scaleMap}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default TestSlide;
