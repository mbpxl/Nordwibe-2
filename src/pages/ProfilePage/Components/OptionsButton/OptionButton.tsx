import { Link } from "react-router-dom";

interface EditButtonProps {
  title: string;
  testId?: string;
}

const EditButton = ({ title, testId }: EditButtonProps) => {
  const getLinkTo = () => {
    if (title === "Редактировать" || title === "Заполнить") {
      return "/edit";
    }

    if (title === "Пройти тест на совместимость" && testId) {
      return `/test/${testId}`;
    }

    return "/test";
  };

  return (
    <div className="w-full text-white my-2 self-center">
      <Link
        to={getLinkTo()}
        className="block bg-purple-main py-2 rounded-[1.875rem] text-center text-[1rem] font-bold leading-4 hover:bg-purple-600 transition-colors"
      >
        {title}
      </Link>
    </div>
  );
};

export default EditButton;
