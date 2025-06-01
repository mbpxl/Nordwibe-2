import { useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";

type Props = StepPropsTypes<"name">;

const NameStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const [userName, setUserName] = useState(formData.name || "");
  const isValidName = userName?.length >= 2;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    const onlyLetters = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    setUserName(onlyLetters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateForm({ name: userName });
    onNext();
  };

  return (
    <main className="relative pt-[1rem] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />
        <Heading
          title={"Ваше имя"}
          subTitle={"(2-18 символов, русские или английские буквы)"}
          formData={formData}
          isCodeStep={false}
        />
      </div>

      <section className="mt-6 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[308px] font-medium text-[1.938rem] leading-10"
        >
          <div className="">
            <input
              type="text"
              placeholder="Имя"
              maxLength={18}
              value={userName}
              onChange={handleChange}
              className="w-full border text-[1.25rem] tracking-widest py-1 px-2 rounded-[12px]"
            />
          </div>
        </form>
      </section>

      <section className="absolute w-full bottom-[130px] text-[1.125rem] leading-[1.25rem] rounded-t-[15px] px-7">
        <button
          onClick={handleSubmit}
          disabled={!isValidName}
          className={`w-full py-[0.75rem] rounded-[30px] font-bold text-white transition ${
            isValidName
              ? "bg-[#3D3D3D] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          Продолжить
        </button>
      </section>
    </main>
  );
};

export default NameStep;
