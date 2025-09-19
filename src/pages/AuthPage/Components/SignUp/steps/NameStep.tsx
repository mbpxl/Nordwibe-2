import { useCallback, useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import Continue from "../../Continue/Continue";
import React from "react";

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
    <main className="relative pt-[1rem] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />
        <Heading
          title={"Ваше имя"}
          subTitle={"(2-18 символов, русские или английские буквы)"}
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
              className="w-full border border-purple-main outline-none text-[1.25rem] tracking-widest py-1 px-2 rounded-[12px]"
            />
          </div>
        </form>
      </section>

      <section className="fixed bottom-[108px] w-full text-[1.125rem] leading-[1.25rem] rounded-t-[15px] px-7">
        <Continue
          handleNext={handleSubmit}
          isValid={isValidName}
          title={"Продолжить"}
        />
      </section>
    </main>
  );
};

export default NameStep;
