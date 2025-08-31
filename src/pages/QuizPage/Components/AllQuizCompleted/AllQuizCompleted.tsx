const AllQuizCompleted: React.FC<{ title: "тесты" | "квизы" }> = ({
  title,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-[10.125rem] h-[10.125rem]"
        src="/icons/quiz/quizes-completed.svg"
        alt="success"
      />
      <h1 className="text-purple-main-disabled text-center text-[1.125rem] font-bold leading-6">
        Поздравляем! Вы прошли все {title}. Скоро появятся ещё.
      </h1>
    </div>
  );
};

export default AllQuizCompleted;
