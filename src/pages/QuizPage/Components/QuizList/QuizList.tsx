import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { mockQuizzes } from "../../../QuizPassingPage/misc/quizData";
import QuizItem from "../QuizItem/QuizItem";

const data = mockQuizzes;

const QuizList = () => {
	console.log(data);
  // const unCompletedQuizzes = data.filter((item) => !item.completed);

  return (
    <Wrapper className="pt-1 pb-12 bg-purple-background-wrap">
      <ProgressBar progress={"1"} totalProgress={data.length} title={"квизы"} />
      <div>
        {data.map((item, index) => (
          <div key={index} className="mb-4">
            <QuizItem
							uuid={item.uuid}
              time={item.time}
              title={item.title}
              description={item.description}
              img={item.image_url}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuizList;
