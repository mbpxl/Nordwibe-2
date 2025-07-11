import { Link } from "react-router-dom";

interface ContinueProps {
  handleNext?: () => void;
  isValid?: boolean;
  title: string;
  to?: string;
}

const Continue: React.FC<ContinueProps> = ({
  handleNext,
  isValid = true,
  title,
  to,
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
      {title}
    </button>
  );
};

export default Continue;
