import React from "react";
import { Link } from "react-router-dom";

interface ContinueProps {
  handleNext?: () => void;
  isValid?: boolean;
  title: string;
  to?: string;
  isPending?: boolean;
  isQuizButton?: boolean;
}

const Continue: React.FC<ContinueProps> = ({
  handleNext,
  isValid = true,
  title,
  to,
  isPending,
  isQuizButton,
}) => {
  const linkClasses =
    "w-full block text-center py-[0.25rem] rounded-[30px] font-bold text-white transition bg-purple-main cursor-pointer";
  const baseClasses =
    "w-full py-[0.75rem] rounded-[30px] font-bold text-white transition";

  const activeClasses = "bg-purple-main cursor-pointer";
  const disabledClasses =
    "bg-purple-main-disabled cursor-not-allowed opacity-50";

  const classes = `${baseClasses} ${isValid ? activeClasses : disabledClasses}`;

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
      className={isQuizButton ? linkClasses : classes}
    >
      {isPending ? (
        <div className="flex justify-center items-center">
          <img
            className="w-10 h-5"
            src="/icons/sign-in/loading-spinner.svg"
            alt=""
          />
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default Continue;
