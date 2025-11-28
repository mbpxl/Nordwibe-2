import { useCallback, useRef, useState } from "react";
import type { StepPropsTypes } from "../../types/SignUpTypes";
import Continue from "../Continue/Continue";
import GoBackButton from "../SignUp/GoBackButton";
import Heading from "../SignUp/Heading";
import useFormatUnformatCode from "../../hooks/useFormatCode";
import React from "react";
import { useConfirmPhone } from "../../service/useConfirmPhone";
import { useLocation } from "react-router-dom";
import { useAccessToken } from "../../../../shared/service/useAuthToken";
import ContinueWrapper from "../ContinueWrapper/ContinueWrapper";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";
import { useRedirectAfterLogin } from "../../../../shared/hooks/useRedirectAfterLogin";
import { AccountDeletionModal } from "../AccountDeletionModal/AccountDeletionModal";
import {
  clearRedirectTimeout,
  forceRedirectToWelcome,
} from "../../../../shared/plugin/redirectToLogin";

type Props = StepPropsTypes<"code">;

const CodeStep: React.FC<Props> = ({
  formData,
  updateForm,
  onNext,
  onBack,
}) => {
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  const fullPhoneNumber = `+7${formData.phone}`;

  const inputRef = useRef<HTMLInputElement>(null);

  // форматирование телефона в вид 0-0-0-0
  const { formatCode, handleChange } = useFormatUnformatCode();

  const [code, setCode] = useState(formData.code || "");

  const location = useLocation();

  const { mutate: getToken } = useAccessToken();
  const { performRedirect } = useRedirectAfterLogin();

  const handleSuccess = () => {
    updateForm({ code });

    getToken(undefined, {
      onSuccess: () => {
        clearRedirectTimeout();

        onNext();
        if (location.pathname === "/sign-in") {
          performRedirect();
          localStorage.removeItem("signin-form");
        }
      },
      onError: (error: any) => {
        console.log("Error details:", error);

        console.log("Account recently deleted, showing modal");
        setShowDeletionModal(true);
      },
    });
  };

  const captcha_token = localStorage.getItem("captcha_token");

  const { mutate, isError, isPending, error } = useConfirmPhone(handleSuccess);

  const handleNext = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (code.length < 4) return;

      if (captcha_token) {
        mutate({ phone: fullPhoneNumber, code, captcha_token });
      }
    },
    [captcha_token, code, fullPhoneNumber, mutate]
  );

  if (isError) {
    //@ts-ignore
    console.log(error?.status);
  }

  const handleCloseDeletionModal = () => {
    forceRedirectToWelcome();
    setShowDeletionModal(false);
  };

  const isCodeValid = code.length === 4 && !isPending && !!captcha_token;

  return (
    <main className="pt-[1rem] min-h-screen relative flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />

        <Heading
          title={"Вам поступит звонок"}
          subTitle={
            "Введите последние четыре цифры номера, с которого поступил звонок"
          }
          isCodeStep
        />

        <section className="mt-6 flex flex-col items-center gap-2 justify-center">
          <form
            className="w-[308px] font-medium text-[1.938rem] leading-10"
            onSubmit={handleNext}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                value={formatCode(code)}
                onChange={(e) => handleChange(e, setCode, inputRef)}
                placeholder="0-0-0-0"
                className="w-full text-center text-[2rem] tracking-widest py-2 outline-none focus:outline-none"
              />
            </div>
          </form>

          <WrongData
            //@ts-ignore
            errorCode={error?.status}
            isError={isError}
          />
        </section>

        <section className="mt-4 flex justify-center">
          <h3 className="font-medium text-[1rem] leading-10 text-[#3D3D3D]">
            Никому не сообщайте номер
          </h3>
        </section>

        <ContinueWrapper>
          <Continue
            handleNext={handleNext}
            isValid={isCodeValid}
            title={"Готово"}
          />
        </ContinueWrapper>
      </div>

      <AccountDeletionModal
        isOpen={showDeletionModal}
        onClose={handleCloseDeletionModal}
      />
    </main>
  );
};

export default CodeStep;
