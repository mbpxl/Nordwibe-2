const Continue: React.FC<{
  handleNext: () => void;
  isValid: boolean;
  title: string;
}> = ({ handleNext, isValid, title }) => {
  return (
    <>
      <button
        onClick={handleNext}
        disabled={!isValid}
        className={`w-full py-[0.75rem] rounded-[30px] font-bold text-white transition ${
          isValid
            ? "bg-purple-main cursor-pointer"
            : "bg-purple-main-disabled cursor-not-allowed opacity-50"
        }`}
      >
        {title}
      </button>
    </>
  );
};

export default Continue;
