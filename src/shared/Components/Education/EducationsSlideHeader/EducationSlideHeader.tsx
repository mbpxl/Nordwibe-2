import { Link } from "react-router-dom";
import cancel from "/imgs/quiz-passing/quiz-cancel.svg";

const EducationSlideHeader: React.FC<{
  heading: string;
  unit: "/test" | "/quiz";
}> = ({ heading, unit }) => {
  return (
    <div className="flex items-center justify-between w-full h-16">
      <Link className="flex-shrink-0" to={`${unit}`}>
        <img src={cancel} alt="x" className="h-4 w-4 cursor-pointer mr-2" />
      </Link>

      <div className="flex-1 flex justify-center">
        <h1 className="text-[16px] max-[23.125rem]:text-[1rem] text-black-heading font-semibold leading-normal text-center text-nowrap">
          {heading}
        </h1>
      </div>

      <div className="flex-shrink-0 w-4" />
    </div>
  );
};

export default EducationSlideHeader;
