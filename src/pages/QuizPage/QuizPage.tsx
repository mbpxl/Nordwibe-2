import Header from "../../shared/Components/Heading/Heading";
import QuizList from "./Components/QuizList/QuizList";

const QuizPage = () => {
  return (
    <div className="">
      <Header title={"Квизы"} imgSrc={""} />
      <QuizList />
    </div>
  );
};

export default QuizPage;
