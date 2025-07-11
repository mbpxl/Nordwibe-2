import { Link } from "react-router-dom";
import goBackIcon from "/icons/arrow-left.svg";
import { useState, useRef } from "react";
import { WELCOME_ROUTE } from "../../../../shared/utils/consts";
import { useBackspacePhoneFix } from "../../hooks/useBackspacePhoneFix";
import { usePhoneFormatter } from "../../hooks/usePhoneNumber";
import type { StepPropsTypes } from "../../types/SignUpTypes";
import Continue from "../Continue/Continue";
import Heading from "../SignUp/Heading";
import UserAgreement from "../UserAgreement/UserAgreement";

type Props = StepPropsTypes<"phone">;

const PhoneStep: React.FC<Props> = ({ formData, updateForm, onNext }) => {
  const [phone, setPhone] = useState(formData.phone);
  const inputRef = useRef<HTMLInputElement>(null);

  const { formatPhone } = usePhoneFormatter();
  const handleKeyDown = useBackspacePhoneFix(inputRef, phone, formatPhone);

  const handleNext = () => {
    updateForm({ phone });
    onNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "");
    const clean = digits.startsWith("7") ? digits.slice(1) : digits;
    const limited = clean.slice(0, 10);
    setPhone(limited);

    if (limited.length === 10) {
      inputRef.current?.blur();
    }
  };

  const isPhoneValid = phone.length === 10;

  return (
    <main className="pt-[1rem]">
      <div>
        <article className="pl-3">
          <Link to={WELCOME_ROUTE}>
            <img src={goBackIcon} alt="Go Back" />
          </Link>
        </article>

        <Heading
          title={"Введите номер телефона"}
          subTitle={""}
          isCodeStep={false}
          formData={{
            phone: "",
            code: "",
            gender: "",
          }}
        />

        <section className="mt-6 flex justify-center">
          <form
            className="w-[308px] font-medium text-[1.938rem] leading-10"
            onSubmit={handleNext}
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] font-semibold">
                +7
              </span>
              <input
                type="tel"
                inputMode="numeric"
                ref={inputRef}
                value={formatPhone(phone)}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="(000) 000-00-00"
                className="w-full pl-[3.5rem] pr-4 py-2 text-[#1A1A1A] outline-none focus:outline-none"
              />
            </div>
          </form>
        </section>

        <section className="m-auto w-[18rem] flex flex-col gap-[1rem] mt-[38vh] font-bold text-[1.125rem] leading-[1.25rem] text-white">
          <Continue
            handleNext={handleNext}
            isValid={isPhoneValid}
            title={"Получить код"}
          />
          <UserAgreement />
        </section>
      </div>
    </main>
  );
};

export default PhoneStep;
