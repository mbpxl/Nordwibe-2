import React from "react";

interface InlineSelectProps {
  title: string;
  options: string[];
  value: string | null;
  onChange: (value: any) => void;
}

const InlineSelect: React.FC<InlineSelectProps> = React.memo(
  ({ title, options, value, onChange }) => {
    return (
      <div className="mt-4">
        <h1 className="text-black-heading text-[1rem] font-semibold leading-[85.714%] mb-2">
          {title}
        </h1>
        <div className="flex gap-3 flex-wrap">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onChange(option)}
              className={`px-2 py-2 text-center rounded-full text-sm font-medium leading-4
              ${
                value === option
                  ? "bg-[#6E6CE1] text-white"
                  : "bg-[#E1E1F3] text-[#8389BE]"
              }
              transition-colors duration-200`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export default InlineSelect;
