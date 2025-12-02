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
import goBackIcon from "/icons/arrow-left.svg";

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
        username: formData.name!,
        name: null,
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
        hashtags_ids: [],
      });
    }
  }, [formData, fillProfile]);

  const isGoalSelected = !!formData.goal;

  if (isError) {
    console.error("Ошибка при заполнении профиля");
    console.log(error?.message || "Неизвестная ошибка");
  }

  if (isSuccess) {
    navigate(MAIN_ROUTE);
    console.log("Профиль успешно заполнен");
  }

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
          {/* === Первый блок - заголовок и выбор цели === */}
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
                Какая у вас цель?
              </h1>
            </div>

            {/* === Блок выбора цели === */}
            <section className="mt-[3.5rem] w-full px-4 max-[361px]:mt-[1.3rem] lg:mt-0 overflow-hidden">
              <div className="flex justify-center gap-4 w-full max-w-2xl mx-auto lg:gap-8 overflow-hidden">
                {[
                  {
                    goal: "Поиск жилья" as GoalType,
                    isSelected: isLookingForRent,
                    icon: isLookingForRent
                      ? looking_for_neighbor_active
                      : looking_for_neighbor,
                    label: "Ищу жильё",
                  },
                  {
                    goal: "Поиск соседа" as GoalType,
                    isSelected: isLookingForNeighbor,
                    icon: isLookingForNeighbor
                      ? looking_for_rent_active
                      : looking_for_rent,
                    label: "Ищу соседа",
                  },
                ].map(({ goal, isSelected, icon, label }) => (
                  <div
                    key={goal}
                    className="flex flex-col items-center flex-1 min-w-[148px] lg:min-w-[200px] overflow-hidden"
                  >
                    <button
                      onClick={() => handleGoalSelect(goal)}
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

          {/* === Второй блок - кнопка "Завершить регистрацию" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0 overflow-hidden">
            <div className="w-full lg:mt-2 px-4 lg:px-0">
              <Continue
                handleNext={handleFinishRegistration}
                isValid={isGoalSelected}
                title={"Завершить регистрацию"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GoalStep;
