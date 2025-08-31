//todo: типы

const BirthField: React.FC<any> = ({ title, value, onChange, ref }) => {
  return (
    <div className="mt-4">
      <h1 className="text-[0.875rem] font-semibold leading-[0.75rem]">
        {title}
      </h1>
      <form className="w-[308px] font-medium text-[1.938rem] leading-2">
        <div className="relative mt-3">
          <input
            type="text"
            ref={ref}
            placeholder="00/00/0000"
            inputMode="numeric"
            pattern="\d*"
            value={value}
            onChange={onChange}
            maxLength={10}
            className="placeholder:text-dark-sub-light text-black-heading w-full text-[1.4rem] tracking-widest outline-none focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default BirthField;
