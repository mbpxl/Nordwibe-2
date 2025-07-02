import { useNavigate } from "react-router-dom";
import arrowLeft from "/icons/arrow-left.svg";

export const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleGoBack}>
      <img src={arrowLeft} alt="back" />
    </button>
  );
};
