import { Link } from "react-router-dom";

type AddInfoTextTypes = {
  title: string;
  text: string;
};

const AddInfoText: React.FC<AddInfoTextTypes> = ({ title, text }) => {
  return (
    <div>
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3 mb-2">
        {title}
      </h1>
      <h2 className="text-purple-main-disabled text-[1rem] font-medium leading-4">
        Хотите{" "}
        <Link to={"/edit"} className="border-b-2">
          добавить
        </Link>{" "}
        {text}?
      </h2>
    </div>
  );
};

export default AddInfoText;
