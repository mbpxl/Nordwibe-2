import React from "react";
import { usePhoneFormatter } from "../../hooks/usePhoneNumber";
import type { HeadingComponentTypes } from "../../types/SignUpTypes";

const Heading: React.FC<HeadingComponentTypes> = ({
  title,
  subTitle,
  isCodeStep,
  formData,
}) => {
  const { formatPhone } = usePhoneFormatter();

  return (
    <section className="mt-[1.875rem] text-center">
      <h1 className="font-semibold text-[2rem] leading-10 text-black-heading">
        {title}
      </h1>
      {subTitle ? (
        <h2
          className={`${
            isCodeStep ? "w-[13.875rem]" : "w-[19.25rem]"
          } m-auto mt-[0.25rem] font-medium text-[1.25rem] leading-[1.5rem] text-black-heading`}
        >
          {subTitle} {isCodeStep ? formatPhone(formData.phone) : ""}
        </h2>
      ) : (
        ""
      )}
    </section>
  );
};

export default Heading;
