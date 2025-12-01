import { useCallback, useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import React from "react";
import goBackIcon from "/icons/arrow-left.svg";

type Props = StepPropsTypes<"name">;

const NameStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const [userName, setUserName] = useState(formData.name || "");
  const isValidName = userName?.length >= 2;
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target?.value;
      const onlyLetters = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
      setUserName(onlyLetters);
    },
    [setUserName]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      updateForm({ name: userName });
      onNext();
    },
    [onNext, updateForm, userName]
  );

  return (
    <main className="px-2 min-h-screen lg:bg-[url(/imgs/desktop/sign-background.jpg)] bg-cover flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-between h-screen
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between
                      lg:w-[616px] lg:h-auto lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          {/* === Первый блок - заголовок, подзаголовок и поле ввода === */}
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0 lg:flex-1 lg:gap-10 lg:justify-center">
            {/* === Заголовок + кнопка назад === */}
            <div className="relative flex items-center justify-center w-full lg:mt-8 lg:mb-6">
              <button
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2
                           lg:w-[44px] lg:h-[44px] lg:bg-[#E1E1F3] lg:rounded-xl lg:flex lg:items-center lg:justify-center"
              >
                <img src={goBackIcon} alt="Назад" className="w-5 h-5" />
              </button>

              <h1
                className="font-semibold text-[1.55rem] leading-[2rem] text-black-heading
                             lg:text-[32px] lg:leading-[40px]"
              >
                Ваше имя
              </h1>
            </div>

            {/* === Подзаголовок === */}
            <h2 className="w-[18.2rem] font-medium text-[1.25rem] leading-[1.5rem] text-[#3D3D3D] mb-6 lg:w-full lg:mb-4">
              (2-18 символов, русские или английские буквы)
            </h2>

            {/* === Поле ввода имени === */}
            <section className="mt-2 flex flex-col items-center gap-2 lg:mt-4 w-full">
              <form
                className="w-[308px] font-medium text-[1.938rem] leading-10 mx-auto lg:w-full"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Имя"
                    maxLength={18}
                    value={userName}
                    onChange={handleChange}
                    className="w-full border border-purple-main outline-none text-[1.25rem] tracking-widest py-1 px-2 rounded-[12px]
                               lg:border-b-2 lg:border-gray-300 lg:rounded-none lg:px-0 lg:text-center lg:focus:border-purple-main 
                               lg:text-[24px] lg:leading-[32px] lg:pb-2 lg:placeholder:text-center"
                  />
                </div>
              </form>
            </section>
          </div>

          {/* === Второй блок - кнопка "Продолжить" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0 lg:mt-30">
            <div className="w-full lg:mt-2">
              <Continue
                handleNext={handleSubmit}
                isValid={isValidName}
                title={"Продолжить"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NameStep;
