import React from "react";

type BudgetType = {
  budget: { min: string; max: string };
  setBudget: (budget: { min: string; max: string }) => void;
};

const Budget: React.FC<BudgetType> = ({ budget, setBudget }) => {
  return (
    <div className="mt-3">
      <h1 className="text-[0.875rem] font-semibold leading-[0.75rem] text-black-heading">
        Бюджет
      </h1>
      <div className="flex mt-2 gap-3 text-black-heading text-[0.875rem] font-medium leading-[1rem]">
        <input
          type="text"
          className="w-full border-2 rounded-[12px] border-purple-main font-medium p-2 focus:outline-none placeholder:text-purple-main-disabled"
          placeholder="от"
          value={budget.min}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBudget({ ...budget, min: e.target.value })
          }
        />
        <input
          type="text"
          className="w-full border-2 rounded-[12px] border-purple-main font-medium p-2 focus:outline-none placeholder:text-purple-main-disabled"
          placeholder="до"
          value={budget.max}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBudget({ ...budget, max: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Budget;
