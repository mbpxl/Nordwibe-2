import React from "react";
import type { LessonsType } from "../../../types/quizDataTypes";
import next from "/icons/quiz/quiz-next.svg";

export interface QuizButtonProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  isNext?: boolean;
  quizData: LessonsType[];
  currentSlide: number;
  isLastQuizStep?: boolean;
  isDesktop?: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({
  setCurrentSlide,
  isNext,
  quizData,
  currentSlide,
  isLastQuizStep,
  isDesktop = false,
}) => {
  const isDisabled = isNext
    ? currentSlide === quizData.length - 1
    : currentSlide === 0;

  const handleClick = () => {
    if (isDisabled) return;

    setCurrentSlide((prev) => (isNext ? prev + 1 : prev - 1));
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <button
          className={`${
            isLastQuizStep ? "opacity-0" : "opacity-100"
          } w-[2.5rem] h-[2.5rem] rounded-[30px] flex justify-center items-center ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-sub-button hover:bg-purple-500"
          } transition-colors`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          <img
            src={next}
            alt={isNext ? "next" : "prev"}
            className={`${!isNext ? "rotate-180" : ""} ${
              isDisabled ? "opacity-50" : "opacity-100"
            }`}
          />
        </button>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <button
          className={`w-10 h-10 rounded-lg flex justify-center items-center ${
            isDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-purple-main hover:bg-purple-600"
          } transition-colors`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          <img
            src={next}
            alt={isNext ? "next" : "prev"}
            className={`${!isNext ? "rotate-180" : ""} ${
              isDisabled ? "opacity-40" : "opacity-100"
            }`}
          />
        </button>
      )}
    </>
  );
};

export default QuizButton;
