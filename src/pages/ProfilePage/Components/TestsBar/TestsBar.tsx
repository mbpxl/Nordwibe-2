import type { TestType } from "../../../TestPage/types/testDataTypes";
import SuggestButton from "../SuggestButton/SuggestButton";
import TestsItem from "./TestsItem";

type TestsBarProps = {
  tests: TestType[];
};

const TestsBar: React.FC<TestsBarProps> = ({ tests }) => {
  return (
    <div className="mt-3">
      <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3 mb-2">
        Тесты
      </h2>
      {tests ? (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {tests.map((test) => (
            <TestsItem key={test.uuid} test={test} />
          ))}
        </div>
      ) : (
        <SuggestButton />
      )}
    </div>
  );
};

export default TestsBar;
