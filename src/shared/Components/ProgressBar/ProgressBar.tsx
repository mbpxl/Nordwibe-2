import type { progressType } from "./types/ProgressBarTypes";

const ProgressBar: React.FC<progressType> = ({
  progress,
  totalProgress,
  title,
}) => {
  const progressPercentage = (Number(progress) / totalProgress) * 100;

  return (
    <div className="w-full my-3 p-3 bg-white rounded-[12px]">
      {(title === "квиз" || title === "тест") && (
        <div className="flex justify-between mb-3">
          <h1 className="text-[0.875rem] font-semibold leading-[0.75rem] text-black-heading">
            Ваш прогресс:
          </h1>
          <h2 className="text-black-heading text-[0.75rem] font-medium leading-3">
            {/* квизов */}
            {progress} / {totalProgress} {title}ов
          </h2>
        </div>
      )}

      <div className="w-full h-4 bg-purple-progress-content rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-main transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
