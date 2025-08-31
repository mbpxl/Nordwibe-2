// TestAnswersItem.tsx

import type { AnswerType } from "../../../TestPage/types/testDataTypes";

interface Props {
  answer: AnswerType;
  isSelected: boolean;
  onSelect: () => void;
}

const TestAnswersItem: React.FC<Props> = ({ answer, isSelected, onSelect }) => {
  return (
    <label className="flex gap-2 mb-2 cursor-pointer">
      <input
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        className="accent-purple-main"
      />
      <h2
        className={`text-[1rem] font-medium leading-[20px] ${
          isSelected ? "text-purple-main" : "text-black-heading"
        }`}
      >
        {answer.answer}
      </h2>
    </label>
  );
};

export default TestAnswersItem;
