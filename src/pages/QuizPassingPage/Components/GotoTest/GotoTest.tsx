import React from "react";
import { Link } from "react-router-dom";

const GotoTest: React.FC<{
  uuid?: string;
  isTest?: boolean;
  answers?: any;
  scaleMap?: any;
  disabled?: boolean;
}> = ({ uuid, isTest, answers, scaleMap, disabled }) => {
  if (isTest) {
    return (
      <button
        disabled={disabled}
        className={`${
          disabled ? "bg-purple-main-disabled" : ""
        } min-w-[13.5rem] my-3 bg-purple-main py-3 text-center rounded-[30px] text-white font-semibold`}
      >
        <Link
          className={`${disabled ? "pointer-events-none" : ""}`}
          to={`/test/${uuid}/result`}
          state={{ answers, scaleMap }}
        >
          Отправить
        </Link>
      </button>
    );
  }

  return (
    <button className="min-w-[13.5rem] my-3 bg-purple-main py-3 text-center rounded-[30px] text-white font-semibold">
      <Link to={`/quiz/test/${uuid}`}>Тест</Link>
    </button>
  );
};

export default GotoTest;
