import { useEffect, useRef, useState } from "react";
import { useFillProfile } from "../../../../shared/service/useFillProfileInfo";

interface AddAboutMySelfProps {
  data: any;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onStartEditing: () => void;
}

const AddAboutMySelf = ({
  data,
  isEditing,
  onCancel,
  onSave,
  onStartEditing,
}: AddAboutMySelfProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [aboutMySelfValue, setAboutMySelfValue] = useState<string>(
    data.about || ""
  );
  const { fillProfile, isPending, isSuccess } = useFillProfile();

  const MAX_LENGTH = 100;
  const currentLength = aboutMySelfValue.length;
  const isMaxLengthReached = currentLength >= MAX_LENGTH;
  const hasExistingText = data.about && data.about.trim().length > 0;

  const handleChangeAboutMySelf = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setAboutMySelfValue(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aboutMySelfValue.trim()) {
      fillProfile({ ...data, about: aboutMySelfValue.trim() });
    }
  };

  const handleCancel = () => {
    setAboutMySelfValue(data.about || "");
    onCancel();
  };

  const handleAddClick = () => {
    onStartEditing();
  };

  useEffect(() => {
    if (isSuccess) {
      onSave();
    }
  }, [isSuccess, onSave]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className="">
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
          О себе
        </h1>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={aboutMySelfValue}
            onChange={handleChangeAboutMySelf}
            className={`w-full h-32 py-1.5 px-3 border-2 rounded-[10px] outline-none resize-none ${
              isMaxLengthReached
                ? "border-red-500 bg-red-50"
                : "border-purple-sub-button"
            }`}
            placeholder="Расскажите о себе"
            maxLength={MAX_LENGTH}
          />
          {/* Счётчик символов */}
          <div
            className={`text-right text-sm mt-1 ${
              isMaxLengthReached ? "text-red-500 font-medium" : "text-gray-500"
            }`}
          >
            {currentLength}/{MAX_LENGTH}
            {isMaxLengthReached && (
              <span className="ml-2">Лимит символов достигнут</span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              disabled={
                !aboutMySelfValue.trim() || isMaxLengthReached || isPending
              }
              className="bg-purple-main text-white px-4 py-2 rounded-[12px] disabled:opacity-50 hover:bg-purple-600 transition-colors"
            >
              {isPending
                ? "Сохранение..."
                : hasExistingText
                ? "Сохранить"
                : "Добавить"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-[12px] hover:bg-gray-400 transition-colors"
              disabled={isPending}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
        О себе
      </h1>
      <div className="">
        {hasExistingText ? (
          <div className="border-2 border-transparent rounded-lg p-2">
            <p className="text-gray-700 whitespace-pre-wrap">{data.about}</p>
            <div className="text-right text-sm text-gray-500 mt-1">
              {data.about.length}/{MAX_LENGTH}
            </div>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleAddClick}>
            <h2 className="text-purple-main-disabled text-[1rem] font-medium leading-4">
              Хотите{" "}
              <span className="border-b-2 border-purple-main-disabled">
                добавить
              </span>{" "}
              информацию о себе?
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAboutMySelf;
