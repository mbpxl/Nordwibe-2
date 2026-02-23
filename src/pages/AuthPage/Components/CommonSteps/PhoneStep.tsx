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
import UserAgreement from "../UserAgreement/UserAgreement";
import { WELCOME_ROUTE } from "../../../../shared/utils/consts";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";
import { clearAuthUserData } from "../../../../shared/plugin/clearUserData";
import { OAuthButtons } from "../OAuth2/OAuthButtons";

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
    [],
  );

  const { data: captchaPublicToken } = useGetCaptchaToken();

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
    <main className="px-2 min-h-screen flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-between h-screen
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between
                      lg:w-[616px] lg:h-auto lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0">
            <div className="relative flex items-center justify-center w-full lg:mt-8 lg:mb-6">
              <Link
                to={WELCOME_ROUTE}
                className="absolute left-0 top-1/2 -translate-y-1/2
                           text-purple-main font-medium
                           lg:w-[44px] lg:h-[44px] lg:bg-[#E1E1F3]
                           lg:rounded-xl lg:flex lg:items-center lg:justify-center"
              >
                <img src={goBackIcon} alt="Назад" className="w-5 h-5" />
              </Link>

              <h1 className="font-semibold text-[1.55rem] leading-[32px] lg:text-[32px] lg:leading-[40px]">
                Введите номер телефона
              </h1>
            </div>

            <form
              className="mt-4 w-[308px] mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <div className="relative w-full mx-auto">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[31px] text-[#1A1A1A]">
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
                  className="w-full pl-[4rem] pr-4 py-2 text-[#1A1A1A] font-medium text-[31px] leading-[40px] outline-none
                             lg:border-b-2 lg:border-gray-300 lg:focus:border-purple-main"
                />
              </div>
            </form>

            <div className="w-full flex justify-center mt-2 lg:mt-2">
              <div className="lg:p-4 lg:border lg:border-gray-200 lg:rounded-xl lg:shadow-sm lg:bg-gray-50">
                <SmartCaptcha
                  key={captchaKey}
                  sitekey={captchaPublicToken}
                  language="ru"
                  onSuccess={handleCaptchaSuccess}
                />
              </div>
            </div>

            {captchaError && (
              <WrongData
                isError={true}
                message="Пожалуйста, пройдите проверку капчи"
              />
            )}

            <WrongData
              isError={isPhoneError}
              message="Неправильный формат номера телефона!"
            />

            <div className="w-full mt-4 px-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400">или войдите через</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <OAuthButtons />
            </div>
          </div>

          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0">
            <div className="w-full mt-2 lg:mt-2">
              <Continue
                handleNext={handleNext}
                isPending={isPending}
                isValid={isPhoneValid}
                title="Получить код"
              />
              <UserAgreement />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PhoneStep;
