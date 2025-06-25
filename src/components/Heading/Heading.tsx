import { useLocation } from "react-router-dom";
import burger from "/icons/burger-stair.svg";
import funnel from "/icons/funnel.svg";

const Header: React.FC<{ title: string; imgSrc: string }> = ({
  title,
  imgSrc,
}) => {
  const location = useLocation();

  return (
    <div className="border-b-2 border-[#d9d9d9] px-3.5 py-3 mb-3">
      <div className="flex justify-between items-center text-[1.25rem] leading-6 font-semibold">
        <div>
          {location.pathname == "/chat" ? (
            <></>
          ) : (
            <img src={burger} alt="burger" />
          )}
        </div>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {location.pathname == "/search" ? (
            <img src={funnel} alt="gear" />
          ) : (
            <img src={imgSrc} alt="gear" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
