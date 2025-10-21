import TestsItem from "./TestsItem";

type TestsBarProps = {
  tests: any;
};

const TestsBar: React.FC<TestsBarProps> = ({ tests }) => {
  return (
    <div className="mt-3">
      <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3 mb-2">
        Тесты
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tests.map((test: any) => (
          <TestsItem key={test.uuid} test={test} />
        ))}
      </div>
    </div>
  );
};

export default TestsBar;
