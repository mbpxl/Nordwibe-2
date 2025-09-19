import React from "react";
import type { HeadingComponentTypes } from "../../types/SignUpTypes";

const Heading: React.FC<HeadingComponentTypes> = ({
  title,
  subTitle,
  isCodeStep,
}) => {
  return (
    <section className="mt-[1.875rem] text-center">
      <h1
        className={`font-semibold text-[1.55rem] leading-9 text-black-heading`}
      >
        {title}
      </h1>
      {subTitle ? (
        <h2
          className={`${
            isCodeStep ? "w-full" : "w-[19.25rem]"
          } m-auto mt-[0.25rem] font-medium text-[1.25rem] leading-[1.5rem]`}
        >
          {subTitle}
        </h2>
      ) : (
        ""
      )}
    </section>
  );
};

export default Heading;
