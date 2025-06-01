import type { HeadingComponentTypes } from "../../types/SignUpTypes";
import { formatPhone } from "./steps/PhoneStep";

const Heading: React.FC<HeadingComponentTypes> = ({
  title,
  subTitle,
  isCodeStep,
  formData,
}) => {
  return (
    <section className="mt-[1.875rem] text-center">
      <h1 className="font-semibold text-[2rem] leading-10 text-[#1A1A1A]">
        {title}
      </h1>
      {subTitle ? (
        <h2
          className={`${
            isCodeStep ? "w-[13.875rem]" : "w-[19.25rem]"
          } m-auto mt-[0.25rem] font-medium text-[1.25rem] leading-[1.5rem] text-[#1A1A1A]`}
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
