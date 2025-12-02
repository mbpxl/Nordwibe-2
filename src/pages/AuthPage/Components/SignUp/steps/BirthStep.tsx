import React, { useCallback } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormatBirthDate from "../../../hooks/useFormatBirthDate";
import goBackIcon from "/icons/arrow-left.svg";

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
    <main className="min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="flex flex-col items-center justify-between h-screen w-full
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between overflow-hidden
                      lg:w-[616px] lg:h-full lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          {/* === Первый блок - заголовок и поле ввода === */}
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0 lg:gap-10 lg:justify-center overflow-hidden">
            {/* === Заголовок + кнопка назад === */}
            <div className="relative flex items-center justify-center w-full px-4 lg:px-0 lg:mt-8 lg:mb-6">
              <button
                onClick={onBack}
                className="absolute left-4 top-1/2 -translate-y-1/2
                           lg:left-0 lg:w-[44px] lg:h-[44px] lg:bg-[#E1E1F3] lg:rounded-xl lg:flex lg:items-center lg:justify-center"
              >
                <img src={goBackIcon} alt="Назад" className="w-5 h-5" />
              </button>

              <h1
                className="font-semibold text-[1.55rem] leading-[2rem] text-black-heading
                             lg:text-[32px] lg:leading-[40px]"
              >
                Дата рождения
              </h1>
            </div>

            {/* === Поле ввода даты === */}
            <section className="mt-6 flex justify-center w-full overflow-hidden lg:mt-0">
              <form
                className="w-[308px] font-medium text-[1.938rem] leading-10 mx-auto lg:w-full"
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
                    className="placeholder:text-dark-sub-light text-black-heading w-full text-center text-[2rem] tracking-widest py-2 outline-none focus:outline-none
                               lg:border-b-2 lg:border-gray-300 lg:focus:border-purple-main lg:text-[31px] lg:leading-[40px] lg:pb-4"
                  />
                </div>
              </form>
            </section>
          </div>

          {/* === Второй блок - кнопка "Продолжить" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-8 overflow-hidden">
            <div className="w-full px-4 lg:px-0">
              <Continue
                handleNext={handleSubmit}
                isValid={isDateValid}
                title={"Продолжить"}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default BirthStep;
