import { Link } from "react-router-dom";

const SuggestButton = () => {
  return (
    <div className="">
      <h1 className="mb-4">У вас не пройдены тесты</h1>
      <Link
        to={"/test"}
        className="inline-block bg-purple-main p-3 text-white rounded-xl"
      >
        Пройти тесты
      </Link>
    </div>
  );
};

export default SuggestButton;
