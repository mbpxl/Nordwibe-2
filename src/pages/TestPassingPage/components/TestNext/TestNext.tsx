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
}

const TestNext: React.FC<Props> = React.memo(
  ({ setCurrentSlide, isLast, disabled, answers, scaleMap, title }) => {
    const isMainTest = title === "Тест на совместимость";

    const { uuid } = useParams<{ uuid: string }>();

    return (
      <div className="flex items-center fixed bottom-0 left-1/2 translate-x-[-50%] w-full bg-white justify-center pb-8 px-4 max-w-[344px]">
        {isLast ? (
          <Link
            to={`/test/${uuid}/result`}
            state={{ answers, scaleMap, isMainTest }}
            className={`bg-purple-main py-2 rounded-[30px] w-full flex gap-2 justify-center items-center ${
              disabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <h1 className="text-white text-[1.25rem] font-semibold leading-[1.5rem]">
              Отправить
            </h1>
          </Link>
        ) : (
          <button
            disabled={disabled}
            onClick={() => setCurrentSlide((prev) => prev + 1)}
            className={`bg-purple-main py-2 rounded-[30px] text-white w-full flex gap-2 justify-center items-center ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <h1 className="text-[1.25rem] font-semibold leading-[1.5rem]">
              Вперёд
            </h1>
            <img src="/icons/test/arrow-right.svg" />
          </button>
        )}
      </div>
    );
  }
);

export default TestNext;
