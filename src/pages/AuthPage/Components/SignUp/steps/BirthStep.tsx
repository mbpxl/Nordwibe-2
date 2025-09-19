import React, { useCallback } from "react";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormatBirthDate from "../../../hooks/useFormatBirthDate";

type Props = StepPropsTypes<"birth">;

const BirthStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const { date, inputRef, isDateValid, handleChange } = useFormatBirthDate(
    formData.birth || ""
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!isDateValid) {
        alert("Введите дату полностью (ДД/ММ/ГГГГ)");
        return;
      }
      updateForm({ birth: date });
      onNext();
    },
    [date, isDateValid, onNext, updateForm]
  );

  return (
    <main className="pt-[1rem] min-h-screen flex flex-col items-center relative">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />
        <Heading title={"Дата рождения"} subTitle={""} />
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

      <section className="fixed bottom-[108px] w-full flex items-center text-[1.125rem] leading-[1.25rem] px-7">
        <Continue
          handleNext={handleSubmit}
          isValid={isDateValid}
          title={"Продолжить"}
        />
      </section>
      <ToastContainer />
    </main>
  );
};

export default BirthStep;
