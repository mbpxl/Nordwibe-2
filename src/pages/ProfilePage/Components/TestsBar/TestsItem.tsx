import { useState } from "react";
// import { baseURLforImages } from "../../../../shared/plugin/axios";
// import type { TestType } from "../../../TestPage/types/testDataTypes";
import Modal from "../../../../shared/Components/Modal/Modal";

type TestsItemProps = {
  test: any;
};

const TestsItem: React.FC<TestsItemProps> = ({ test }) => {
  const [isDescriptionOpened, setIsDescriptionOpened] =
    useState<boolean>(false);

  return (
    <div
      onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
      className="w-[150px] h-[150px] rounded-xl bg-purple-background-gender flex gap-y-2.5 flex-col items-center text-center justify-center overflow-hidden shrink-0 shadow-sm"
    >
      <img
        src={test.image_url}
        alt={test.title}
        className="w-1/2 h-1/2 object-cover rounded-xl"
      />
      <span className="text-[0.895rem] font-medium">{test.title}</span>

      <Modal
        isOpen={isDescriptionOpened}
        closeModal={() => setIsDescriptionOpened(!isDescriptionOpened)}
      >
        <h1 className="text-center text-[0.875rem] font-semibold leading-4 mb-2">
          {test.result}
        </h1>
        <p className="text-[0.875rem] font-normal leading-4">
          {test.description}
        </p>
      </Modal>
    </div>
  );
};

export default TestsItem;
