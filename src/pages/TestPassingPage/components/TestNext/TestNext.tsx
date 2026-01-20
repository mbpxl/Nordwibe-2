import { Link, useParams } from "react-router-dom";
import type {
  SelectedAnswer,
  ScaleMap,
} from "../../../TestResultPage/types/test";
import React from "react";

interface Props {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
  disabled: boolean;
  answers: SelectedAnswer[];
  scaleMap: ScaleMap;
  title?: string;
  isDesktop?: boolean;
}

const TestNext: React.FC<Props> = React.memo(
  ({
    setCurrentSlide,
    isLast,
    disabled,
    answers,
    scaleMap,
    title,
    isDesktop = false,
  }) => {
    const isMainTest = title === "Тест на совместимость";
    const { uuid } = useParams<{ uuid: string }>();

    const buttonContent = isLast ? (
      <Link
        to={`/test/${uuid}/result`}
        state={{ answers, scaleMap, isMainTest, testId: uuid }}
        className={`bg-purple-main py-3 rounded-lg w-full flex gap-2 justify-center items-center ${
          disabled ? "opacity-50 pointer-events-none" : "hover:bg-purple-600"
        }`}
      >
        <h1 className="text-white text-lg font-semibold">Отправить</h1>
      </Link>
    ) : (
      <button
        disabled={disabled}
        onClick={() => setCurrentSlide((prev) => prev + 1)}
        className={`bg-purple-main py-3 rounded-lg text-white w-full flex gap-2 justify-center items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
        }`}
      >
        <h1 className="text-lg font-semibold">Вперёд</h1>
        <img src="/icons/test/arrow-right.svg" alt="Вперёд" />
      </button>
    );

    // Desktop версия
    if (isDesktop) {
      return <div className="w-full">{buttonContent}</div>;
    }

    // Мобильная версия
    return (
      <div className="flex items-center fixed bottom-0 left-1/2 translate-x-[-50%] w-full bg-white justify-center pb-8 px-4 max-w-[344px]">
        {buttonContent}
      </div>
    );
  },
);

export default TestNext;
