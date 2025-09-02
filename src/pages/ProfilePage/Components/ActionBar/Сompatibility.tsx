const Сompatibility: React.FC<{ onChange: () => void }> = ({ onChange }) => {
  return (
    <div onClick={onChange} className="flex flex-col items-center">
      <h1 className="text-[0.75rem] text-black-heading font-semibold leading-[0.875rem]">
        Совместимость
      </h1>
      <div className="relative mt-0.5 py-1 px-2 text-white bg-green-correct rounded-xl">
        <h2>- -%</h2>
        <span className="absolute top-[-3px] right-0 w-3 h-3 bg-purple-main rounded-[50%]"></span>
      </div>
    </div>
  );
};

export default Сompatibility;
