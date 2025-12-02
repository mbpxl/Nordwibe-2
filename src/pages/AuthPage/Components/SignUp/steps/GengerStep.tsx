import female from "/icons/female.svg";
import male from "/icons/male.svg";
import female_active from "/icons/female-active.svg";
import male_active from "/icons/male-active.svg";
import type { GenderType, StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import React, { useCallback } from "react";
import goBackIcon from "/icons/arrow-left.svg";

type Props = StepPropsTypes<"gender">;

const GenderStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const handleGenderSelect = useCallback(
    (gender: GenderType) => {
      updateForm({ gender });
    },
    [updateForm]
  );

  const isMale = formData.gender === "Мужской";
  const isFemale = formData.gender === "Женский";

  const handleNext = useCallback(() => {
    if (formData.gender) onNext();
  }, [formData.gender, onNext]);

  const isGenderSelected = !!formData.gender;

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="flex flex-col items-center justify-between h-screen w-full
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between overflow-hidden
                      lg:w-[616px] lg:h-auto lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          {/* === Первый блок - заголовок и выбор пола === */}
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0 lg:flex-1 lg:gap-10 lg:justify-center overflow-hidden">
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
                Ваш пол
              </h1>
            </div>

            {/* === Блок выбора пола === */}
            <section className="mt-[3.5rem] w-full px-4 max-[361px]:mt-[1.3rem] lg:mt-0 overflow-hidden">
              <div className="flex justify-center gap-4 w-full max-w-2xl mx-auto lg:gap-8 overflow-hidden">
                {[
                  {
                    gender: "Мужской" as GenderType,
                    isSelected: isMale,
                    icon: isMale ? male_active : male,
                    label: "Мужской",
                  },
                  {
                    gender: "Женский" as GenderType,
                    isSelected: isFemale,
                    icon: isFemale ? female_active : female,
                    label: "Женский",
                  },
                ].map(({ gender, isSelected, icon, label }) => (
                  <div
                    key={gender}
                    className="flex flex-col items-center flex-1 min-w-[148px] lg:min-w-[200px] overflow-hidden"
                  >
                    <button
                      onClick={() => handleGenderSelect(gender)}
                      className={`aspect-square w-full max-w-[200px] max-[361px]:max-w-[130px] 
                                 lg:max-w-[240px] lg:rounded-[24px]
                                 flex justify-center items-center rounded-[20px] transition ${
                                   isSelected
                                     ? "bg-purple-main lg:bg-purple-main"
                                     : "bg-purple-background-gender lg:bg-purple-background-gender"
                                 }`}
                    >
                      <img src={icon} alt={label} className="lg:w-20 lg:h-20" />
                    </button>
                    <h2
                      className={`text-center ${
                        isSelected ? "font-semibold" : "font-medium"
                      } text-[1rem] leading-5 text-black-heading mt-[0.75rem] w-full max-w-[200px]
                                 lg:text-[20px] lg:leading-[28px] lg:mt-4`}
                    >
                      {label}
                    </h2>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* === Второй блок - кнопка "Продолжить" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0 overflow-hidden">
            <div className="w-full lg:mt-2 px-4 lg:px-0">
              <Continue
                handleNext={handleNext}
                isValid={isGenderSelected}
                title={"Продолжить"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenderStep;
