import ProgressBar from "../../../../shared/Components/ProgressBar/ProgressBar";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { quizMock } from "../../misc/quizMock";
import QuizItem from "../QuizItem/QuizItem";

const QuizList = () => {
  return (
    <Wrapper
      className={`pt-1 pb-12
         bg-purple-background-wrap
      flex flex-col items-center min-h-screen`}
    >
      <ProgressBar
        progress={0}
        totalProgress={quizMock.length}
        title={"квиз"}
      />
      <div className="max-w-[600px]">
        <div className="">
          {quizMock.map((item: any, index: any) => (
            <div key={index} className="mb-4">
              <QuizItem
                uuid={item.uuid}
                time={item.duration}
                title={item.title}
                description={item.description}
                image_url={item.image_url}
              />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default QuizList;
