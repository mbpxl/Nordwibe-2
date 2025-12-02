import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TestAnswersList from "../TestAnswersList/TestAnswersList";
import TestNext from "../TestNext/TestNext";
import EducationSlideHeader from "../../../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import EducationImage from "../../../../shared/Components/Education/EducationsTypography/EducationImage";
import EducationTitle from "../../../../shared/Components/Education/EducationsTypography/EducationTitle";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import { useGetTests } from "../../../TestPage/service/useGetTests";
import Loading from "../../../../shared/Components/Loading/Loading";
import type {
  Scale,
  ScaleMap,
  SelectedAnswer,
} from "../../../TestResultPage/types/test";
import { baseURLforImages } from "../../../../shared/plugin/axios";

interface TestSlideProps {
  isDesktop?: boolean;
}

const TestSlide = ({ isDesktop = false }: TestSlideProps) => {
  const { data, isLoading, isError } = useGetTests();
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const [currentSlide, setCurrentSlide] = useState(0);

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
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper className="min-h-screen flex flex-col justify-between pb-[30px] items-center">
          <div className="max-w-[344px] w-full flex-grow flex flex-col">
            <div className="flex flex-col flex-grow">
              <EducationSlideHeader
                heading={selectedTest.title}
                unit={"/test"}
              />

              <EducationImage image_url={baseURLforImages + slide.image_url} />

              <EducationTitle title={slide.question} />

              <div className="flex-grow">
                <TestAnswersList
                  answers={slide.answers}
                  questionUuid={slide.uuid}
                  selectedAnswerUuid={selectedAnswers[slide.uuid]?.answerId}
                  onSelect={handleSelectAnswer}
                />
              </div>

              <TestNext
                setCurrentSlide={setCurrentSlide}
                isLast={currentSlide === questions.length - 1}
                disabled={!isAnswerSelected}
                answers={Object.values(selectedAnswers)}
                scaleMap={scaleMap}
                title={selectedTest.title}
              />
            </div>
          </div>
        </Wrapper>
      )}
      {/* Desktop версия */}
      {isDesktop && (
        <div className="h-full flex flex-col">
          {/* Заголовок (без крестика на desktop) */}
          <div className="px-6 pt-6 flex-shrink-0">
            <EducationSlideHeader
              heading={selectedTest.title}
              unit={"/test"}
              isDesktop={true}
            />
          </div>

          {/* Контент с прокруткой */}
          <div className="flex-1 overflow-y-auto px-6">
            {/* Картинка на всю ширину */}
            <EducationImage
              image_url={baseURLforImages + slide.image_url}
              isDesktop={true}
            />

            {/* Вопрос */}
            <EducationTitle title={slide.question} isDesktop={true} />

            {/* Варианты ответов */}
            <TestAnswersList
              answers={slide.answers}
              questionUuid={slide.uuid}
              selectedAnswerUuid={selectedAnswers[slide.uuid]?.answerId}
              onSelect={handleSelectAnswer}
              isDesktop={true}
            />
          </div>

          {/* Кнопка далее - фиксирована внизу */}
          <div className="flex-shrink-0 p-6 border-t border-gray-200">
            <TestNext
              setCurrentSlide={setCurrentSlide}
              isLast={currentSlide === questions.length - 1}
              disabled={!isAnswerSelected}
              answers={Object.values(selectedAnswers)}
              scaleMap={scaleMap}
              title={selectedTest.title}
              isDesktop={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TestSlide;
