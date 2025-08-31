import { useEffect, useRef, useState } from "react";
import { useFillProfile } from "../../../../shared/service/useFillProfileInfo";

const AddAboutMySelf = ({ data }: any) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChangeEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const [aboutMySelfValue, setAboutMySelfValue] = useState<string>(
    localStorage.getItem("about") || ""
  );
  const handleChangeAboutMySelf = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAboutMySelfValue(e.target?.value);
    localStorage.setItem("about", e.target?.value);
  };

  const { fillProfile } = useFillProfile();

  const handleAddAboutMySelf = () => {
    fillProfile({ ...data, about: aboutMySelfValue });
    localStorage.removeItem("about");
  };

  useEffect(() => {
    if (isEditMode && textareaRef.current) {
      textareaRef.current.focus();

      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditMode]);

  return (
    <div className="">
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
        О себе
      </h1>
      <div className="">
        {isEditMode ? (
          <div className="">
            <textarea
              ref={textareaRef}
              value={aboutMySelfValue}
              onChange={handleChangeAboutMySelf}
              onBlur={handleChangeEditMode}
              className="w-full h-17 py-1.5 px-1 border-2 border-purple-sub-button rounded-[10px] outline-none"
            ></textarea>
            <div className="">
              <button
                onClick={handleAddAboutMySelf}
                className="bg-purple-main text-white p-2 rounded-[12px]"
              >
                Добавить
              </button>
            </div>
          </div>
        ) : (
          <div onClick={handleChangeEditMode}>
            <h2 className="text-purple-main-disabled text-[1rem] font-medium leading-4">
              Хотите <span className="border-b-2">добавить</span> информацию о
              себе?
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAboutMySelf;
