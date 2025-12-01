import { Link } from "react-router-dom";

const UserAgreement = () => {
  return (
    <div className="absolute max-w-[344px] lg:static lg:max-w-full">
      <p className="text-purple-main-disabled font-medium text-[0.75rem] text-center leading-[1rem]">
        Нажимая на кнопку «Получить код», я принимаю условия{" "}
        <span className="underline text-purple-heading">
          пользовательское соглашение и{" "}
          <Link to="/privacy" style={{ textDecoration: "underline" }}>
            политику конфиденциальности
          </Link>{" "}
        </span>
      </p>
    </div>
  );
};

export default UserAgreement;
