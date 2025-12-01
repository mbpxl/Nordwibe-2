interface MessageUserButtonProps {
  onClick: () => void;
  isBlocked?: boolean;
}

const MessageUserButton: React.FC<MessageUserButtonProps> = ({
  onClick,
  isBlocked = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-center rounded-[30px] py-3 lg:w-full text-[1.25rem] font-bold leading-6 ${
        isBlocked
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-purple-main text-white hover:bg-purple-600"
      }`}
    >
      {isBlocked ? "Заблокирован" : "Написать"}
    </button>
  );
};

export default MessageUserButton;
