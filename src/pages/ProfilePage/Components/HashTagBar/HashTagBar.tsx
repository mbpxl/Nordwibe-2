/* eslint-disable @typescript-eslint/no-explicit-any */
import HashTag from "../../../../shared/Components/HashTag/HashTag";
import ShowMore from "../ShowMore/ShowMore";

const HashTagBar = ({ hashTags }: { hashTags: string[] }) => {
  return (
    <div>
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3 mb-2">
        Хештеги
      </h1>
      <ShowMore maxHeight={50}>
        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {hashTags.map((hashTag: any) => (
            <div key={hashTag} className="shrink-0">
              <HashTag hashtagTitle={hashTag} />
            </div>
          ))}
        </div>
      </ShowMore>
    </div>
  );
};

export default HashTagBar;
