import { baseURLforImages } from "../../../../shared/plugin/axios";
import type { TestType } from "../../../TestPage/types/testDataTypes";

type TestsItemProps = {
  test: TestType;
};

const TestsItem: React.FC<TestsItemProps> = ({ test }) => {
  return (
    <div className="w-[150px] h-[150px] rounded-xl bg-purple-background-gender flex gap-y-2.5 flex-col items-center justify-center overflow-hidden shadow-sm">
      <img
        src={baseURLforImages + test.image_url}
        alt={test.title}
        className="w-1/2 h-1/2 object-cover rounded-xl"
      />
      <span className="text-[0.895rem] font-medium">{test.title}</span>
    </div>
  );
};

export default TestsItem;
