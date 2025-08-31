import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import looking_for_neighbor from "/icons/looking_for_neighbor.svg";
import looking_for_rent from "/icons/looking_for_rent.svg";
import looking_for_neighbor_active from "/icons/looking_for_neighbor_active.svg";
import looking_for_rent_active from "/icons/looking_for_rent_active.svg";
import type { GoalType, StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import { useFillProfile } from "../../../../../shared/service/useFillProfileInfo";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../../../../shared/utils/consts";
import React, { useCallback } from "react";
//todo import { useGetMe } from "../../../../ProfilePage/service/useGetMe";

type Props = StepPropsTypes<"goal">;

const GoalStep: React.FC<Props> = ({ onBack, formData, updateForm }) => {
  const handleGoalSelect = (goal: GoalType) => {
    updateForm({ goal });
  };

  const navigate = useNavigate();

  const isLookingForRent = formData.goal === "Поиск жилья";
  const isLookingForNeighbor = formData.goal === "Поиск соседа";

  const { fillProfile, isError, isSuccess, error } = useFillProfile();

  const handleFinishRegistration = useCallback(() => {
    const birthDate = formData.birth
      ? new Date(formData.birth.split("/").reverse().join("-")).toISOString()
      : "";

    if (formData.goal) {
      fillProfile({
        username: null,
        name: formData.name!,
        birth_date: birthDate,
        usage_goal: formData.goal,
        desired_length: null,
        chronotype: null,
        max_budget: null,
        occupation: null,
        smoking_status: null,
        gender: formData.gender,
        pets: null,
        religion: null,
        about: null,
        ready_for_smalltalk: false,
        city_id: null,
        hometown_id: null,
        hashtags_ids: null,
      });
    }
  }, [formData, fillProfile]);

  const isGoalSelected = !!formData.goal;

  if (isError) {
    console.error("Ошибка при заполнении профиля"); // todo: добавить toast
    console.log(error?.message || "Неизвестная ошибка");
  }

  if (isSuccess) {
    navigate(MAIN_ROUTE);
    console.log("Профиль успешно заполнен"); // todo: добавить toast
  }
  return (
    <main className="pt-[1rem] min-h-screen relative flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />

        <Heading
          title={"Какая у вас цель?"}
          subTitle={""}
          formData={formData}
          isCodeStep={true}
        />
      </div>

      <section className="mt-[3.5rem] max-[352px]:mt-[1rem] w-full px-4">
        <div className="flex justify-center gap-4 w-full max-w-2xl mx-auto">
          {[
            {
              goal: "Поиск жилья" as GoalType,
              isSelected: isLookingForRent,
              icon: isLookingForRent
                ? looking_for_neighbor_active
                : looking_for_neighbor,
              text: "У меня есть жильё — ищу соседа(ей)",
            },
            {
              goal: "Поиск соседа" as GoalType,
              isSelected: isLookingForNeighbor,
              icon: isLookingForNeighbor
                ? looking_for_rent_active
                : looking_for_rent,
              text: "Нет жилья — ищу жилье и соседа(ей)",
            },
          ].map(({ goal, isSelected, icon, text }) => (
            <div
              key={goal}
              className="flex flex-col items-center flex-1 min-w-[148px] max-[352px]:min-w-[80px]"
            >
              <button
                onClick={() => handleGoalSelect(goal)}
                className={`aspect-square w-full max-w-[200px] flex justify-center items-center rounded-[20px] transition ${
                  isSelected ? "bg-purple-main" : "bg-purple-background-gender"
                }`}
              >
                <img src={icon} alt={"цель"} />
              </button>
              <h2
                className={`text-center font-medium text-[1rem] leading-5 text-black-heading mt-[0.75rem] w-full max-w-[200px]`}
              >
                {text}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full fixed bottom-[108px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem] px-7">
        <Continue
          handleNext={handleFinishRegistration}
          isValid={isGoalSelected}
          title={"Завершить регистрацию"}
        />
      </section>
    </main>
  );
};

export default GoalStep;
