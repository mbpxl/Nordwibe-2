import React, { useRef, useState } from "react";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import { useSignFormStore } from "../../../../../shared/store/SignFormStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = StepPropsTypes<"birth">;

const BirthStep: React.FC<Props> = ({ onNext, onBack }) => {
  const { formData, updateForm } = useSignFormStore();

  const [date, setDate] = useState(formData.birth || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 8);

    let formattedValue = "";
    if (rawValue.length >= 5) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(
        2,
        4
      )}/${rawValue.slice(4, 8)}`;
    } else if (rawValue.length >= 3) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}`;
    } else {
      formattedValue = rawValue;
    }

    if (formattedValue.length === 10) {
      inputRef.current?.blur();
    }

    setDate(formattedValue);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const isDateCorrect = date.length === 10;
    if (!isDateCorrect) {
      alert("Введите дату полностью (ДД/ММ/ГГГГ)");
      return;
    }
    updateForm({ birth: date });
    onNext();
  };
  const day = date.slice(0, 2); // получаем день из введённой строки
  const month = date.slice(3, 5); // получаем месяц из введённой строки
  const year = date.slice(6, date.length); // получаем год из введённой строки
  const currentYear = new Date().getFullYear();

  const isDateCorrect =
    date.length === 10 &&
    Number(day) <= 31 &&
    Number(month) <= 12 &&
    Number(year) <= currentYear - 18 &&
    Number(year) >= 1910;

  return (
    <main className="pt-[1rem] min-h-screen flex flex-col items-center relative">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />
        <Heading
          title={"Дата рождения"}
          subTitle={""}
          formData={formData}
          isCodeStep={false}
        />
      </div>

      <section className="mt-6 flex justify-center">
        <form
          className="w-[308px] font-medium text-[1.938rem] leading-10"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              ref={inputRef}
              placeholder="00/00/0000"
              inputMode="numeric"
              pattern="\d*"
              value={date}
              onChange={handleChange}
              maxLength={10}
              className="placeholder:text-dark-sub-light text-black-heading w-full text-center text-[2rem] tracking-widest py-2 outline-none focus:outline-none"
            />
          </div>
        </form>
      </section>

      <section className="absolute bottom-[130px] w-full flex items-center text-[1.125rem] leading-[1.25rem] px-7">
        <Continue
          handleNext={handleSubmit}
          isValid={isDateCorrect}
          title={"Продолжить"}
        />
      </section>
      <ToastContainer />
    </main>
  );
};

export default BirthStep;
