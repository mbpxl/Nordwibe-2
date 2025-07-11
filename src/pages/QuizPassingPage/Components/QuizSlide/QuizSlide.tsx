import { useState } from "react";
import { quizData } from "../../misc/quizData";
import QuizSlideHeader from "../QuizSlideHeader/quizSlideHeader";
import QuizProgress from "../QuizProgress/QuizProgress";

const QuizSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = quizData;

  const paragraphsStyles =
    "text-black-heading text-[1rem] font-medium leading-5 mt-6";

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 pb-[30px]">
      <div className="h-[320px]">
        <div className="flex flex-col">
          <QuizSlideHeader heading={data[currentSlide].heading} />
          <img
            src={data[currentSlide].img}
            alt={`Quiz Image`}
            className="self-center mb-3"
          />
          <h2 className="text-black-heading text-[1rem] font-semibold leading-5">
            {data[currentSlide].title}
          </h2>
          <p className={paragraphsStyles}>{data[currentSlide].textPart1}</p>
          <p className={paragraphsStyles}>{data[currentSlide].textPart2}</p>
          <p className={paragraphsStyles}>{data[currentSlide].textPart3}</p>
        </div>
      </div>

      <QuizProgress
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        quizData={data}
      />
    </div>
  );
};

export default QuizSlide;
