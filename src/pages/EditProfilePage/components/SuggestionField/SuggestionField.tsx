import { useState } from "react";

type SuggestionFieldType = {
  title: string;
  value: string;
  onChange: (value: string) => void;
	suggestionsList: string[];
};

const SuggestionField = ({ title, value, onChange, suggestionsList }: SuggestionFieldType) => {
  const [isFocus, setFocus] = useState(false);

  const filteredSuggestions = suggestionsList.filter((city) =>
    city.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="flex justify-center mt-3 text-[0.875rem] font-semibold leading-[0.75rem]">
      <div className="w-full max-w-md">
        <h1 className="">{title}</h1>
        <div className="mt-2 relative">
          <input
            type="text"
            value={value}
            placeholder={title}
            className="w-full border-2 rounded-[12px] border-purple-main font-medium p-2 focus:outline-none"
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setTimeout(() => setFocus(false), 100);
            }}
            onChange={(e) => onChange(e.target.value)}
          />

          { isFocus && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 max-h-60 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded z-10">
              {filteredSuggestions.map((city, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onChange(city);
                    setFocus(false);
                  }}
                  className="p-3 font-medium hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionField;
