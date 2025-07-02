import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import looking_for_neighbor from "/icons/looking_for_neighbor.svg";
import looking_for_rent from "/icons/looking_for_rent.svg";
import looking_for_neighbor_active from "/icons/looking_for_neighbor_active.svg";
import looking_for_rent_active from "/icons/looking_for_rent_active.svg";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";
import { useSignFormStore } from "../../../../../shared/store/SignFormStore";

type Props = StepPropsTypes<"goal">;

const GoalStep: React.FC<Props> = ({ onNext, onBack }) => {
  const { formData, updateForm } = useSignFormStore();

  const handleGenderSelect = (goal: string) => {
    updateForm({ goal });
  };

  const isLookingForRent = formData.goal === "rent"; // человечек, который ищет жильё
  const isLookingForNeighbor = formData.goal === "neighbor"; // человечек, у которого есть жилье, он ищет соседа

  const handleNext = () => {
    if (formData.goal) onNext();
  };

  const isGoalSelected = !!formData.goal;

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

      <section className="mt-[3.5rem] w-full px-4">
        <div className="flex justify-center gap-4 w-full max-w-2xl mx-auto">
          {[
            {
              goal: "rent",
              isSelected: isLookingForRent,
              icon: isLookingForRent
                ? looking_for_neighbor_active
                : looking_for_neighbor,
              text: "У меня есть жильё — ищу соседа(ей)",
            },
            {
              goal: "neighbor",
              isSelected: isLookingForNeighbor,
              icon: isLookingForNeighbor
                ? looking_for_rent_active
                : looking_for_rent,
              text: "Нет жилья — ищу жилье и соседа(ей)",
            },
          ].map(({ goal, isSelected, icon, text }) => (
            <div
              key={goal}
              className="flex flex-col items-center flex-1 min-w-[148px]"
            >
              <button
                onClick={() => handleGenderSelect(goal)}
                className={`aspect-square w-full max-w-[200px] flex justify-center items-center rounded-[20px] transition ${
                  isSelected ? "bg-purple-main" : "bg-purple-background-gender"
                }`}
              >
                <img src={icon} alt={goal} />
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

      <section className="absolute w-full bottom-[130px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem] px-7">
        <Continue
          handleNext={handleNext}
          isValid={isGoalSelected}
          title={"Продолжить"}
        />
      </section>
    </main>
  );
};

export default GoalStep;
