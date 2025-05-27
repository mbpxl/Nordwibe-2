import { useEffect, useState } from "react";
import goBackIcon from "../../assets/icons/arrow-left.svg";
import { formatPhone } from "./PhoneStep";

type CodeStepProps = {
  onNext: () => void;
  onBack: () => void;
  formData: {
    phone: string;
    code: string;
  };
  updateForm: (data: Partial<{ code: string }>) => void;
};

const CodeStep: React.FC<CodeStepProps> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const [code, setCode] = useState(formData.code || "");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Таймер 30 секунд
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatCode = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    return digits.split("").join("-");
  };

  const unformatCode = (formatted: string) => {
    return formatted.replace(/\D/g, "").slice(0, 4);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = unformatCode(raw);
    setCode(cleaned);
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length < 4) return;

    updateForm({ code });
    onNext();
  };

  const isCodeValid = code.length === 4;

  return (
    <main className="px-2 pt-[3.672rem] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md">
        <article>
          <button onClick={onBack}>
            <img src={goBackIcon} alt="Go Back" />
          </button>
        </article>

        <section className="mt-[1.875rem] text-center">
          <h1 className="font-semibold text-[2rem] leading-10 text-[#1A1A1A]">
            Введите код
          </h1>
          <h2 className="w-[13.875rem] m-auto mt-[0.25rem] font-medium text-[1.25rem] leading-[1.5rem] text-[#1A1A1A]">
            Отправили на номер +7 {formatPhone(formData.phone)}
          </h2>
        </section>

        <section className="mt-6 flex justify-center">
          <form
            className="w-[308px] font-medium text-[1.938rem] leading-10"
            onSubmit={handleNext}
          >
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                value={formatCode(code)}
                onChange={handleChange}
                placeholder="0-0-0-0"
                className="w-full text-center text-[2rem] tracking-widest py-2"
              />
            </div>
          </form>
        </section>

        <section className="mt-[1.75rem] flex justify-center">
          <h3 className="font-medium text-[1rem] leading-10 text-[#3D3D3D]">
            Никому не сообщайте код
          </h3>
        </section>

        <section className="m-auto w-[18rem] flex flex-col items-center gap-[1rem] mt-[30vh] text-[1.125rem] leading-[1.25rem]">
          <button
            onClick={handleNext}
            disabled={!isCodeValid}
            className={`w-full py-[0.75rem] rounded-[30px] font-bold text-white transition 
              ${
                isCodeValid
                  ? "bg-[#3D3D3D] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
          >
            Готово
          </button>

          <div className="text-center text-[#3D3D3D] font-medium">
            {canResend ? (
              <button className="leading-[1.25rem] font-semibold text-[#3D3D3D] text-[1rem] underline">
                Отправить код повторно
              </button>
            ) : (
              <button>
                Отправить код повторно можно через{" "}
                <span className="font-semibold">{timer} сек</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CodeStep;
