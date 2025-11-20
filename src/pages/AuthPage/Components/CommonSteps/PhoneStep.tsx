import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { usePhoneRequest } from "../../service/usePhoneRequest";
import { useGetCaptchaToken } from "../../service/useGetCaptchaToken";
import { usePhoneFormatter } from "../../hooks/usePhoneNumber";
import { useBackspacePhoneFix } from "../../hooks/useBackspacePhoneFix";
import type { StepPropsTypes } from "../../types/SignUpTypes";

import goBackIcon from "/icons/arrow-left.svg";
import Continue from "../Continue/Continue";
import Heading from "../SignUp/Heading";
import UserAgreement from "../UserAgreement/UserAgreement";
import { WELCOME_ROUTE } from "../../../../shared/utils/consts";
import React from "react";
import ContinueWrapper from "../ContinueWrapper/ContinueWrapper";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";
import { clearAuthUserData } from "../../../../shared/plugin/clearUserData";
import OAuthButtons from "../OAuth2/OAuthButtons";

type Props = StepPropsTypes<"phone">;

const PhoneStep: React.FC<Props> = ({ formData, updateForm, onNext }) => {
  const [phone, setPhone] = useState(formData.phone);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [initialPhone] = useState(formData.phone);

  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPhone, handleInputChange } = usePhoneFormatter();
  const handleKeyDown = useCallback(
    useBackspacePhoneFix(inputRef, phone, formatPhone),
    []
  );

  const { data: captchaPublicToken, isError: isCaptchaError } =
    useGetCaptchaToken();

  useEffect(() => {
    const savedToken = localStorage.getItem("captcha_token");
    if (savedToken) {
      setCaptchaToken(savedToken);
      setIsCaptchaVerified(true);
    }
  }, []);

  useEffect(() => {
    if (captchaToken) {
      localStorage.setItem("captcha_token", captchaToken);
      setIsCaptchaVerified(true);
      setCaptchaError(false);
    }
  }, [captchaToken]);

  const handleSuccess = useCallback(() => {
    updateForm({ phone });
    onNext();
  }, [phone, updateForm, onNext]);

  if (isCaptchaError) {
    console.error("Ошибка получения токена капчи");
  }

  const {
    sendPhoneRequest,
    isPending,
    isError: isPhoneError,
  } = usePhoneRequest(handleSuccess);

  const handleNext = useCallback(() => {
    const currentToken = localStorage.getItem("captcha_token");

    if (!currentToken) {
      setCaptchaError(true);
      setIsCaptchaVerified(false);
      resetCaptcha();
      return;
    }

    // Обновляем состояние токена
    setCaptchaToken(currentToken);

    clearAuthUserData();
    const fullPhoneNumber = `+7${phone}`;

    sendPhoneRequest({
      phone: fullPhoneNumber,
      captcha_token: currentToken,
    });
  }, [phone, sendPhoneRequest]);

  const handleCaptchaSuccess = useCallback((token: string) => {
    setCaptchaToken(token);
    setIsCaptchaVerified(true);
    setCaptchaError(false);
  }, []);

  const resetCaptcha = useCallback(() => {
    setCaptchaToken("");
    setIsCaptchaVerified(false);
    localStorage.removeItem("captcha_token");
    setCaptchaKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (phone.length === 0 && initialPhone.length > 0) {
      resetCaptcha();
    }
  }, [phone, initialPhone, resetCaptcha]);

  const isPhoneValid = phone.length === 10 && isCaptchaVerified && !isPending;

  return (
    <main className="pt-[1rem]">
      <article className="pl-3">
        <Link to={WELCOME_ROUTE}>
          <img src={goBackIcon} alt="Go Back" />
        </Link>
      </article>

      <Heading title="Введите номер телефона" subTitle="" />

      <section className="mt-6 flex flex-col items-center gap-2">
        <form
          className="w-[308px] font-medium text-[1.938rem] leading-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
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
              onChange={(e) => handleInputChange(e, setPhone, inputRef)}
              onKeyDown={handleKeyDown}
              placeholder="(000) 000-00-00"
              className="w-full pl-[3.5rem] pr-4 py-0.5 text-[#1A1A1A] outline-none focus:outline-none"
            />
          </div>
        </form>

        <div className="flex flex-col items-center gap-2">
          <div key={captchaKey}>
            <SmartCaptcha
              sitekey={captchaPublicToken}
              language="ru"
              onSuccess={handleCaptchaSuccess}
            />
          </div>
        </div>
      </section>

      <OAuthButtons />

      <WrongData
        isError={isPhoneError}
        message={"Неправильный формат номера телефона!"}
      />

      {captchaError && (
        <div className="flex flex-col items-center gap-2">
          <WrongData
            isError={true}
            message={"Пожалуйста, пройдите проверку капчи"}
          />
        </div>
      )}

      <ContinueWrapper>
        <Continue
          handleNext={handleNext}
          isPending={isPending}
          isValid={isPhoneValid}
          title="Получить код"
        />
        <UserAgreement />
      </ContinueWrapper>
    </main>
  );
};

export default PhoneStep;
