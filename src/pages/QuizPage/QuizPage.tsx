import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import QuizList from "./Components/QuizList/QuizList";

const QuizPage = () => {
  return (
    <div className="">
      <TopicHeader>
        <h1>Квизы</h1>
      </TopicHeader>
      <QuizList />
    </div>
  );
};

export default QuizPage;
