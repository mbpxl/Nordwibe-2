import React from "react";
import { Link } from "react-router-dom";

interface ContinueProps {
  handleNext?: () => void;
  isValid?: boolean;
  title: string;
  to?: string;
  isPending?: boolean;
  isQuizButton?: boolean;
  isCompleted?: boolean;
}

const Continue: React.FC<ContinueProps> = ({
  handleNext,
  isValid = true,
  title,
  to,
  isPending,
  isQuizButton,
  isCompleted = false,
}) => {
  // Определяем классы для различных состояний
  const getButtonClasses = () => {
    // Базовые классы
    const baseClasses =
      "w-full py-[0.75rem] rounded-[30px] font-bold text-white transition";

    // Для кнопки в виде ссылки (квизы)
    if (isQuizButton) {
      if (isCompleted) {
        return "w-full block text-center py-[0.25rem] rounded-[30px] font-bold text-white transition bg-green-500 hover:bg-green-600 cursor-pointer";
      }
      return "w-full block text-center py-[0.25rem] rounded-[30px] font-bold text-white transition bg-purple-main hover:bg-purple-600 cursor-pointer";
    }

    // Для обычной кнопки
    if (isCompleted) {
      return `${baseClasses} ${
        isValid
          ? "bg-green-500 hover:bg-green-600 cursor-pointer"
          : "bg-green-500/50 cursor-not-allowed"
      }`;
    }

    // Обычное состояние
    return `${baseClasses} ${
      isValid
        ? "bg-purple-main hover:bg-purple-600 cursor-pointer"
        : "bg-purple-main-disabled cursor-not-allowed opacity-50"
    }`;
  };

  const linkClasses = isCompleted
    ? "w-full block text-center py-[0.25rem] rounded-[30px] font-bold text-white transition bg-green-500 hover:bg-green-600 cursor-pointer"
    : "w-full block text-center py-[0.25rem] rounded-[30px] font-bold text-white transition bg-purple-main hover:bg-purple-600 cursor-pointer";

  const classes = getButtonClasses();

  if (to) {
    return (
      <Link
        to={to}
        onClick={handleNext}
        className={linkClasses}
        style={{ pointerEvents: isValid ? "auto" : "none" }}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      onClick={handleNext}
      disabled={!isValid}
      className={classes}
      title={
        isCompleted ? "Просмотреть материалы пройденного квиза" : undefined
      }
    >
      {isPending ? (
        <div className="flex justify-center items-center">
          <img
            className="w-10 h-5"
            src="/icons/sign-in/loading-spinner.svg"
            alt="Загрузка"
          />
        </div>
      ) : (
        <>{title}</>
      )}
    </button>
  );
};

export default Continue;
