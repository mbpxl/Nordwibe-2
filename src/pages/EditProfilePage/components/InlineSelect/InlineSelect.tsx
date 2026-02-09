import React from "react";

interface InlineSelectProps {
  title: string;
  options: string[];
  value: string | string[] | null | undefined;
  onChange: (value: any) => void;
  multiple?: boolean;
  maxSelections?: number;
}

const InlineSelect: React.FC<InlineSelectProps> = React.memo(
  ({
    title,
    options,
    value,
    onChange,
    multiple = false,
    maxSelections = 4,
  }) => {
    const isSelected = (option: string): boolean => {
      if (multiple && Array.isArray(value)) {
        return value.includes(option);
      }
      return value === option;
    };

    const handleOptionClick = (option: string) => {
      if (multiple) {
        let newValue: string[];

        if (!value || !Array.isArray(value)) {
          newValue = [option];
        } else {
          newValue = [...value];

          if (isSelected(option)) {
            const index = newValue.indexOf(option);
            if (index > -1) {
              newValue.splice(index, 1);
            }
          } else {
            if (newValue.length < maxSelections) {
              newValue.push(option);
            }
          }
        }

        onChange(newValue);
      } else {
        onChange(option === value ? null : option);
      }
    };

    const handleClearAll = () => {
      if (multiple) {
        onChange([]);
      }
    };

    const handleSelectAll = () => {
      if (multiple) {
        onChange([...options]);
      }
    };

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-black-heading text-[1rem] font-semibold leading-[85.714%]">
            {title}
          </h1>
          {multiple && (
            <div className="flex gap-2">
              {Array.isArray(value) && value.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Очистить
                </button>
              )}
              {Array.isArray(value) && value.length !== options.length && (
                <button
                  onClick={handleSelectAll}
                  className="text-xs text-purple-main hover:text-purple-600 transition-colors"
                >
                  Выбрать все
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-2 py-2 text-center rounded-full text-sm font-medium leading-4 transition-colors duration-200 ${
                isSelected(option)
                  ? "bg-[#6E6CE1] text-white"
                  : "bg-[#E1E1F3] text-[#8389BE] hover:bg-[#d0d0e8]"
              }`}
              disabled={
                multiple &&
                !isSelected(option) &&
                Array.isArray(value) &&
                value.length >= maxSelections
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

export default InlineSelect;
