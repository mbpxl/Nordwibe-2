import { useEffect, useRef, useState } from "react";

const AddAboutMySelf = ({ data, handleChangeEditAboutMyself }: any) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [aboutMySelfValue, setAboutMySelfValue] = useState<string>("");
  // const { fillProfile, isSuccess } = useFillProfile();

  const handleChangeEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleChangeAboutMySelf = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAboutMySelfValue(e.target.value);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (aboutMySelfValue.trim()) {
  //     fillProfile({ ...data, about: aboutMySelfValue.trim() });
  //   }
  //   handleChangeEditAboutMyself();
  // };

  const handleCancel = () => {
    setAboutMySelfValue("");
    setIsEditMode(false);
    if (data.about) {
      handleChangeEditAboutMyself();
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsEditMode(false);
  //     setAboutMySelfValue("");
  //   }
  // }, [isSuccess]);

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
            <form>
              <textarea
                ref={textareaRef}
                value={aboutMySelfValue}
                onChange={handleChangeAboutMySelf}
                className="w-full h-17 py-1.5 px-1 border-2 border-purple-sub-button rounded-[10px] outline-none"
                placeholder="Расскажите о себе"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={!aboutMySelfValue.trim()}
                  className="bg-purple-main text-white p-2 rounded-[12px] disabled:opacity-50"
                >
                  Добавить
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 p-2 rounded-[12px] disabled:opacity-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div onClick={handleChangeEditMode} className="cursor-pointer">
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
