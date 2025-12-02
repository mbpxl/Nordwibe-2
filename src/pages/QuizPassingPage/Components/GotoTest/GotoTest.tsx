import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface GotoTestProps {
  uuid?: string;
  isDesktop?: boolean;
}

const GotoTest: React.FC<GotoTestProps> = ({ uuid, isDesktop = false }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (isDesktop) {
      e.preventDefault();
      navigate(`/quiz/test/${uuid}`, { replace: true });
    }
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <button className="min-w-[13.5rem] my-3 bg-purple-main py-3 text-center rounded-[30px] text-white font-semibold hover:bg-purple-600 transition-colors">
          <Link to={`/quiz/test/${uuid}`}>Тест</Link>
        </button>
      )}

      {/* Desktop версия */}
      {isDesktop && (
        <div className="w-full">
          <button
            onClick={handleClick}
            className="w-full bg-purple-main hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
          >
            Перейти к тесту
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            После завершения квиза вы перейдете к тесту
          </p>
        </div>
      )}
    </>
  );
};

export default GotoTest;
