import React from "react";
import Continue from "../../../AuthPage/Components/Continue/Continue";
import type { QuizCardType } from "../../../QuizPassingPage/types/quizDataTypes";

const QuizItem: React.FC<QuizCardType> = ({
  uuid,
  time,
  title,
  description,
  image_url,
}) => {
  return (
    <div className="flex p-3 gap-x-3 bg-white rounded-[12px]">
      <div className="shrink-0">
        <img src={image_url} alt="quiz_image" />
      </div>
      <div className="max-w-[350.7px]">
        <p className="text-purple-heading text-[0.625rem] font-medium leading-[0.75rem] mb-1 max-[334px]:text-[0.58rem] max-[334px]:leading-[0.696rem]">
          Время прохождения: {time} мин
        </p>
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[1rem] mb-1 max-[334px]:text-[0.78rem] max-[334px]:leading-[0.888rem]">
          {title}
        </h1>
        <p className="h-[65px] text-black-heading text-[0.75rem] font-normal leading-[0.75rem] max-[334px]:text-[0.635rem] max-[334px]:mb-[0.625rem]">
          {description}
        </p>
        <Continue title={"Перейти"} to={`/quiz/${uuid}`} />
      </div>
    </div>
  );
};

export default QuizItem;
