import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import female from "/icons/female.svg";
import male from "/icons/male.svg";
import female_active from "/icons/female-active.svg";
import male_active from "/icons/male-active.svg";
import type { GenderType, StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import React, { useCallback } from "react";

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
    <main className="pt-[1rem] min-h-screen relative flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />

        <Heading
          title={"Ваш пол"}
          subTitle={""}
          formData={formData}
          isCodeStep={true}
        />
      </div>

      <section className="mt-[3.5rem] w-full px-4 max-[361px]:mt-[1.3rem]">
        <div className="flex justify-center gap-4 w-full max-w-2xl mx-auto">
          {[
            {
              gender: "Мужской" as GenderType,
              isSelected: isMale,
              icon: isMale ? male : male_active,
              label: "Мужской",
            },
            {
              gender: "Женский" as GenderType,
              isSelected: isFemale,
              icon: isFemale ? female : female_active,
              label: "Женский",
            },
          ].map(({ gender, isSelected, icon, label }) => (
            <div
              key={gender}
              className="flex flex-col items-center flex-1 min-w-[148px]"
            >
              <button
                onClick={() => handleGenderSelect(gender)}
                className={`aspect-square w-full max-w-[200px] max-[361px]:max-w-[130px] flex justify-center items-center rounded-[20px] transition ${
                  isSelected ? "bg-purple-main" : "bg-purple-background-gender"
                }`}
              >
                <img src={icon} alt={"гендер"} />
              </button>
              <h2
                className={`text-center ${
                  isSelected ? "font-semibold" : "font-medium"
                } text-[1rem] leading-5 text-black-heading mt-[0.75rem] w-full max-w-[200px]`}
              >
                {label}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="fixed bottom-[108px] w-full rounded-t-[15px] text-[1.125rem] leading-[1.25rem] px-7">
        <Continue
          handleNext={handleNext}
          isValid={isGenderSelected}
          title={"Продолжить"}
        />
      </section>
    </main>
  );
};

export default GenderStep;
