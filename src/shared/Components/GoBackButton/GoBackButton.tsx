import { useNavigate } from "react-router-dom";
import arrowLeft from "/icons/arrow-left.svg";

/*
добавил ебаный костыль в виде fromProfile
потому что после реализации useRedirectAfterLogin при клике на кнопку назад перекидывает на /welcome
*/
export const GoBackButton: React.FC<{ fromProfile?: boolean }> = ({
  fromProfile,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (fromProfile) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleGoBack}>
      <img src={arrowLeft} alt="back" />
    </button>
  );
};
