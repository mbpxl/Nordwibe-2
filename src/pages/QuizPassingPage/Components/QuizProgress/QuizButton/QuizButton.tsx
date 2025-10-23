import React from "react";
import type { LessonsType } from "../../../types/quizDataTypes";
import next from "/icons/quiz/quiz-next.svg";

export interface QuizButtonProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  isNext?: boolean;
  quizData: LessonsType[];
  currentSlide: number;
  isLastQuizStep?: boolean;
  disabled?: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({
  setCurrentSlide,
  isNext,
  quizData,
  currentSlide,
  isLastQuizStep,
  disabled,
}) => {
  const isDisabled = isNext
    ? currentSlide === quizData.length - 1
    : currentSlide === 0;

  const handleClick = () => {
    if (isDisabled) return;

    setCurrentSlide((prev) => (isNext ? prev + 1 : prev - 1));
  };

  return (
    <button
      className={`${
        isLastQuizStep ? "opacity-0" : "opacity-100 "
      } w-[2.5rem] h-[2.5rem] rounded-[30px] flex justify-center items-center ${
        isDisabled || disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-purple-sub-button"
      }`}
      onClick={handleClick}
      disabled={isDisabled || disabled}
    >
      <img
        src={next}
        alt={isNext ? "next" : "prev"}
        className={`${!isNext ? "rotate-180" : ""} opacity-${
          isDisabled || disabled ? "50" : "100"
        }`}
      />
    </button>
  );
};
export default QuizButton;
