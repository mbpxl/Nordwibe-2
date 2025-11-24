import React, { useState, useRef } from "react";
import HashTag from "../../../../shared/Components/HashTag/HashTag";

type CityOption = { id: string; name: string };

type Props = {
  title: string;
  value: string | CityOption | null;
  type?: string;
  onChange: (v: any) => void;
  suggestions: CityOption[];
  isLoading?: boolean;
  isError?: boolean;
  multiple?: boolean;
  chips?: string[];
  onAddChip?: (chip: string) => void;
  onRemoveChip?: (chip: string) => void;
  notFoundLabel?: string;
  onNotFoundClick?: () => void;
  favorite?: boolean;
  notFavorite?: boolean;
};

const SuggestionField = ({
  title,
  value,
  onChange,
  suggestions,
  isLoading,
  isError,
  multiple = false,
  chips = [],
  onAddChip,
  onRemoveChip,
  notFoundLabel,
  onNotFoundClick,
  favorite,
  notFavorite,
}: Props) => {
  const [isFocus, setFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputValue = typeof value === "string" ? value : value?.name ?? "";

  const notFound =
    !isLoading &&
    !isError &&
    inputValue.trim().length > 1 &&
    suggestions.length === 0;

  const commitChip = (raw?: string) => {
    if (!multiple || !onAddChip) return;
    const text = (raw ?? inputValue).trim();
    if (!text) return;
    onAddChip(text);
    onChange("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (multiple) {
      if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
        e.preventDefault();
        commitChip();
        return;
      }
      if (
        e.key === "Backspace" &&
        inputValue.length === 0 &&
        chips.length > 0
      ) {
        onRemoveChip?.(chips[chips.length - 1]);
      }
    }
  };

  return (
    <div className="flex justify-center mt-3 text-[0.875rem] font-semibold leading-[0.75rem]">
      <div className="w-full max-w-md">
        <h1>{title}</h1>

        <div className="mt-2 relative" ref={containerRef}>
          <div
            className={`w-full border-2 rounded-[12px] border-purple-main p-2 focus-within:ring-2 focus-within:ring-purple-300 bg-white`}
            onClick={() => {
              setFocus(true);
              const input = containerRef.current?.querySelector("input");
              (input as HTMLInputElement)?.focus();
            }}
          >
            <div className={`flex flex-wrap items-center gap-2`}>
              {multiple &&
                chips.map((tag) => (
                  <HashTag
                    key={tag.toLowerCase()}
                    hashtagTitle={tag}
                    onRemove={() => onRemoveChip?.(tag)}
                    isCreating={true}
                    isFavorite={favorite}
                    isNotFavorite={notFavorite}
                  />
                ))}

              <input
                type="text"
                value={inputValue}
                placeholder={title}
                className="min-w-[120px] flex-1 outline-none font-medium placeholder:font-normal"
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 100)}
                onChange={(e) => {
                  if (multiple) {
                    onChange(e.target.value);
                  } else {
                    // 🔹 при вводе руками сохраняем как строку
                    onChange({ id: "", name: e.target.value });
                  }
                }}
                onKeyDown={onKeyDown}
              />
            </div>
          </div>

          {isFocus &&
            (isLoading || suggestions.length > 0 || notFound || isError) && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full max-h-60 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded z-10">
                {isLoading && (
                  <div className="p-3 text-gray-400">Загрузка...</div>
                )}

                {isError && !isLoading && (
                  <div className="p-3 text-red-500">Ошибка загрузки</div>
                )}

                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      if (multiple) {
                        commitChip(s.name);
                      } else {
                        // 🔹 теперь возвращаем весь объект
                        onChange(s);
                      }
                      setFocus(false);
                    }}
                    className="p-3 font-medium hover:bg-gray-100 cursor-pointer"
                  >
                    {multiple ? `#${s.name}` : s.name}
                  </div>
                ))}

                {notFound && notFoundLabel && (
                  <div
                    className="p-3 text-purple-main-disabled text-[0.875rem] font-medium leading-4 cursor-pointer hover:bg-gray-100"
                    onClick={onNotFoundClick}
                  >
                    {notFoundLabel}
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionField;
