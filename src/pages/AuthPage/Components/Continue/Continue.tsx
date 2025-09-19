import React from "react";
import { Link } from "react-router-dom";

interface ContinueProps {
  handleNext?: () => void;
  isValid?: boolean;
  title: string;
  to?: string;
  isPending?: boolean;
}

const Continue: React.FC<ContinueProps> = ({
  handleNext,
  isValid = true,
  title,
  to,
  isPending,
}) => {
  const linkClasses =
    "w-full py-[0.25rem] rounded-[30px] font-bold text-white transition bg-purple-main cursor-pointer";
  const baseClasses =
    "w-full py-[0.75rem] rounded-[30px] font-bold text-white transition";

  const activeClasses = "bg-purple-main cursor-pointer";
  const disabledClasses =
    "bg-purple-main-disabled cursor-not-allowed opacity-50";

  const classes = `${baseClasses} ${isValid ? activeClasses : disabledClasses}`;

  if (to) {
    return (
      <button type="submit" onClick={handleNext} className={linkClasses}>
        <Link to={to}>{title}</Link>
      </button>
    );
  }

  return (
    <button onClick={handleNext} disabled={!isValid} className={classes}>
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
