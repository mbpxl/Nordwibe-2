import { Link } from "react-router-dom";
import goBackIcon from "../../assets/icons/arrow-left.svg";
import { useState } from "react";
import { WELCOME_ROUTE } from "../../utils/consts";

type PhoneStepProps = {
  onNext: () => void;
  formData: {
    phone: string;
    code: string;
  };
  updateForm: (data: Partial<{ phone: string }>) => void;
};

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

const PhoneStep: React.FC<PhoneStepProps> = ({
  onNext,
  formData,
  updateForm,
}) => {
  const [phone, setPhone] = useState(formData.phone);

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
  };

  const isPhoneValid = phone.length === 10;

  return (
    <main className="px-2 pt-[3.672rem]">
      <div>
        <article>
          <Link to={WELCOME_ROUTE}>
            <img src={goBackIcon} alt="Go Back" />
          </Link>
        </article>

        <section className="mt-[1.875rem] text-center">
          <h1 className="font-semibold text-[2rem] leading-10 text-[#1A1A1A]">
            Введите номер телефона
          </h1>
        </section>

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
                value={formatPhone(phone)}
                onChange={handleInputChange}
                placeholder="(000) 000-00-00"
                className="w-full pl-[3.5rem] pr-4 py-2 text-[#1A1A1A]"
              />
            </div>
          </form>
        </section>

        <section className="m-auto w-[18rem] flex flex-col gap-[1rem] mt-[50vh] font-bold text-[1.125rem] leading-[1.25rem] text-white">
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
        </section>
      </div>
    </main>
  );
};

export default PhoneStep;
