import { Link } from "react-router-dom";
import goBackIcon from "../../../assets/icons/arrow-left.svg";
import { useState, useRef } from "react";
import { WELCOME_ROUTE } from "../../../utils/consts";
import Heading from "../Heading";
import type { StepPropsTypes } from "../../../types/SignUpTypes";

type Props = StepPropsTypes<"phone">;

// eslint-disable-next-line react-refresh/only-export-components
export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = [];

  if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
  if (digits.length >= 3) parts[0] += ")";
  if (digits.length > 3) parts.push(" " + digits.slice(3, 6));
  if (digits.length > 6) parts.push("-" + digits.slice(6, 8));
  if (digits.length > 8) parts.push("-" + digits.slice(8, 10));

  return parts.join("");
};

const PhoneStep: React.FC<Props> = ({ onNext, formData, updateForm }) => {
  const [phone, setPhone] = useState(formData.phone);
  const inputRef = useRef<HTMLInputElement>(null);

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
                placeholder="(000) 000-00-00"
                className="w-full pl-[3.5rem] pr-4 py-2 text-[#1A1A1A] outline-none focus:outline-none"
              />
            </div>
          </form>
        </section>

        <section className="m-auto w-[18rem] flex flex-col gap-[1rem] mt-[38vh] font-bold text-[1.125rem] leading-[1.25rem] text-white">
          <button
            onClick={handleNext}
            disabled={!isPhoneValid}
            className={`px-[1.25rem] py-[0.75rem] rounded-[30px] transition 
              ${
                isPhoneValid
                  ? "bg-[#3D3D3D] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
          >
            Получить код
          </button>
          <p className="text-[#3D3D3D] font-medium text-[0.75rem] text-center leading-[1rem]">
            Нажимая на кнопку «Получить код», я принимаю условия{" "}
            <span className="underline text-black">
              пользовательское соглашение и политику конфиденциальности
            </span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default PhoneStep;
