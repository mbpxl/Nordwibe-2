import { Link } from "react-router-dom";
import cancel from "/imgs/quiz-passing/quiz-cancel.svg";

const QuizSlideHeader: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 h-16">
      <Link className="flex-shrink-0" to={"/quiz"}>
        <img src={cancel} alt="x" className="h-4 w-4 cursor-pointer" />
      </Link>

      <div className="flex-1 flex justify-center">
        <h1 className="text-[20px] text-black-heading font-semibold leading-normal text-center">
          {heading}
        </h1>
      </div>

      <div className="flex-shrink-0 w-4" />
    </div>
  );
};

export default QuizSlideHeader;
