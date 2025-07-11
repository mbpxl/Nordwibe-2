import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import { cardData } from "../../misc/cardsData";
import QuizItem from "../QuizItem/QuizItem";

const data = cardData;

const QuizList = () => {
  const unCompletedQuizzes = data.filter((item) => !item.completed);

  return (
    <div className="px-3 pt-1 pb-12 bg-purple-background-wrap">
      <ProgressBar progress={"1"} totalProgress={data.length} title={"квизы"} />
      <div>
        {unCompletedQuizzes.map((item, index) => (
          <div key={index} className="mb-4">
            <QuizItem
              time={item.time}
              title={item.title}
              description={item.description}
              img={item.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
