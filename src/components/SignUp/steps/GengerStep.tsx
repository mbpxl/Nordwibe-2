import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import female from "/icons/female.svg";
import male from "/icons/male.svg";
import female_active from "/icons/female-active.svg";
import male_active from "/icons/male-active.svg";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import Continue from "../../Continue/Continue";

type Props = StepPropsTypes<"gender">;

const GenderStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const handleGenderSelect = (gender: string) => {
    updateForm({ gender });
  };

  const isMale = formData.gender === "male";
  const isFemale = formData.gender === "female";

  const handleNext = () => {
    if (formData.gender) onNext();
  };

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

      <section className="mt-[3.5rem]">
        <div className="flex gap-[0.75rem]">
          <div>
            <button
              onClick={() => handleGenderSelect("male")}
              className={`w-[9.25rem] h-[9.25rem] flex justify-center items-center rounded-[20px] transition ${
                isMale ? "bg-purple-main" : "bg-purple-background-gender"
              }`}
            >
              {isMale ? (
                <img src={male} alt="male" />
              ) : (
                <img src={male_active} alt="male" />
              )}
            </button>
            <h2 className="text-center font-medium text-[1rem] leading-10 text-[#3D3D3D] mt-[0.75rem]">
              Мужской
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleGenderSelect("female")}
              className={`w-[9.25rem] h-[9.25rem] flex justify-center items-center rounded-[20px] transition ${
                isFemale ? "bg-purple-main" : "bg-purple-background-gender"
              }`}
            >
              {isFemale ? (
                <img src={female} alt="female" />
              ) : (
                <img src={female_active} alt="female" />
              )}
            </button>
            <h2 className="text-center font-medium text-[1rem] leading-10 text-[#3D3D3D] mt-[0.75rem]">
              Женский
            </h2>
          </div>
        </div>
      </section>

      <section className="absolute w-full bottom-[130px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem] px-7">
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
