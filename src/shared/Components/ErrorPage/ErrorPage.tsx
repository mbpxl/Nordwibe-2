import RetryButton from "./RetryButton/RetryButton";
import error from "/icons/error/ErrorIMG.svg";

const Error = () => {
  return (
    <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-transparent z-50">
      <img className="w-[162px] h-[162px]" src={error} alt="loading" />
      <h1 className="text-purple-main-disabled text-center text-[1.125rem] font-bold leading-6">
        Ошибка, попробуйте позже
      </h1>
      <RetryButton />
    </div>
  );
};

export default Error;
