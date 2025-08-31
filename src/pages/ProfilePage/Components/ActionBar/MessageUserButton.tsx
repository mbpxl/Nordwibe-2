import { Link } from "react-router-dom";

const MessageUserButton = () => {
  return (
    <Link
      to={"/chat"}
      className="bg-purple-main w-full text-center rounded-[30px] py-3 text-[1.25rem] text-white font-bold leading-6"
    >
      Написать
    </Link>
  );
};

export default MessageUserButton;
