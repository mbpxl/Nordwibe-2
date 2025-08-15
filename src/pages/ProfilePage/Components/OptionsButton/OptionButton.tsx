import { Link } from "react-router-dom";

const EditButton = ({ title }: { title: string }) => {
  return (
    <div className="w-[21.5rem] text-white my-3">
      <Link
        to={`${title === "Редактировать" ? "/edit" : "/compatibility"}`}
        className="block bg-purple-main py-2 rounded-[1.875rem] text-center text-[1rem] font-bold leading-4"
      >
        {title}
      </Link>
    </div>
  );
};

export default EditButton;
