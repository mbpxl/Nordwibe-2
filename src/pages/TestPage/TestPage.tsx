import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import TestList from "./components/TestList/TestList";

const TestPage = () => {
  return (
    <div className="">
      <TopicHeader>
        <h1>Тесты</h1>
      </TopicHeader>
      <TestList />
    </div>
  );
};

export default TestPage;
