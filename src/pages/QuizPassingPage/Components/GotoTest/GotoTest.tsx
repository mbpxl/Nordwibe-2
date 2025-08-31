import React from "react";
import { Link } from "react-router-dom";

const GotoTest: React.FC<{ uuid?: string }> = ({ uuid }) => {
  return (
    <button className="min-w-[13.5rem] my-3 bg-purple-main py-3 text-center rounded-[30px] text-white font-semibold">
      <Link to={`/quiz/test/${uuid}`}>Тест</Link>
    </button>
  );
};

export default GotoTest;
