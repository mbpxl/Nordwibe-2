import React from "react";

interface BirthFieldProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement | null>;
  error?: string;
  ageError?: boolean;
}

const BirthField: React.FC<BirthFieldProps> = ({
  title,
  value,
  onChange,
  ref,
  error,
  ageError,
}) => {
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
            className={`placeholder:text-dark-sub-light text-black-heading w-full text-[1.4rem] tracking-widest outline-none focus:outline-none ${
              error || ageError ? "border-b-2 border-red-500" : ""
            }`}
          />
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {ageError && (
        <p className="text-red-500 text-sm mt-1">
          Сервис доступен только для пользователей 18+
        </p>
      )}
    </div>
  );
};

export default BirthField;
