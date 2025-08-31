const QuizTestAction: React.FC<{ onSubmit: () => void; disabled: boolean }> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-center pt-3 pb-8 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`w-[216px] h-[40px] rounded-[30px] transition ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-main text-white hover:bg-purple-700"
        }`}
      >
        Отправить
      </button>
    </div>
  );
};

export default QuizTestAction;
