import type { AnswerType } from "../../../TestPage/types/testDataTypes";
import TestAnsersItem from "../TestAnswersItem/TestAnsersItem";

interface Props {
  answers: AnswerType[];
  questionUuid: string;
  selectedAnswerUuid?: string;
  onSelect: (questionUuid: string, answerUuid: string, value: number) => void;
}

const TestAnswersList: React.FC<Props> = ({
  answers,
  questionUuid,
  selectedAnswerUuid,
  onSelect,
}) => {
  return (
    <div className="mt-2 mb-22">
      {answers.map((item) => (
        <TestAnsersItem
          key={item.uuid}
          answer={item}
          isSelected={selectedAnswerUuid === item.uuid}
          onSelect={() => onSelect(questionUuid, item.uuid, item.value)}
        />
      ))}
    </div>
  );
};

export default TestAnswersList;
