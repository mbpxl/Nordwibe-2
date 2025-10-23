import { Link } from "react-router-dom";

const EditButton = ({ title }: { title: string }) => {
  return (
    <div className="w-full text-white my-3 self-center">
      <Link
        to={"/profile"}
        className="block pointer-events-none bg-purple-main py-2 rounded-[1.875rem] text-center text-[1rem] font-bold leading-4"
      >
        {title}
      </Link>
    </div>
  );
};

export default EditButton;
