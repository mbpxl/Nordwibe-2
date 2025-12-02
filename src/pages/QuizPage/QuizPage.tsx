import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import QuizList from "./Components/QuizList/QuizList";

const QuizPage = () => {
  return (
    <div className="">
      <div className="lg:hidden">
        <TopicHeader>
          <h1>Квизы</h1>
        </TopicHeader>
      </div>

      <QuizList />
    </div>
  );
};

export default QuizPage;
