import React, { useCallback, useEffect, useRef, useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import addPhotoImg from "/imgs/AddPhoto.png";
import removePhoto from "/icons/removePhoto.svg";
import Continue from "../../Continue/Continue";
import { useUploadAvatar } from "../../../../../shared/service/useUploadProfilePhoto";
import { validateImageFile } from "../../../../../shared/utils/validateImageFile";
import goBackIcon from "/icons/arrow-left.svg";

type Props = StepPropsTypes<"photos">;
type PhotoEntry = File | string;

const PhotoStep: React.FC<Props> = ({
  onBack,
  onNext,
  formData,
  updateForm,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: uploadAvatar } = useUploadAvatar();
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const objectUrlsRef = useRef(new Map<File, string>());

  const photos = (formData.photos || []) as PhotoEntry[];

  const getPreviewUrl = useCallback((file: File) => {
    const exist = objectUrlsRef.current.get(file);
    if (exist) return exist;
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.set(file, url);
    return url;
  }, []);

  const revokePreviewUrl = useCallback((file: File) => {
    const url = objectUrlsRef.current.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(file);
    }
  }, []);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  const handleAddPhoto = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !files[0]) return;

      if (photos.length >= 4) {
        event.target.value = "";
        return;
      }

      const file = files[0];

      setValidationError(null);

      const isValidImage = await validateImageFile(file);

      if (!isValidImage) {
        setValidationError(
          "Файл поврежден или не является валидным изображением."
        );
        event.target.value = "";
        return;
      }

      updateForm({ photos: [...photos, file] });
      event.target.value = "";
    },
    [photos, updateForm]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const updated = [...photos];
      const removed = updated.splice(index, 1)[0];
      if (removed instanceof File) {
        revokePreviewUrl(removed);
      }
      updateForm({ photos: updated });
      setValidationError(null);
    },
    [photos, updateForm, revokePreviewUrl]
  );

  const handleClickAdd = useCallback(() => {
    if (photos.length < 4) {
      setValidationError(null);
      inputRef.current?.click();
    }
  }, [photos.length]);

  const handleNext = useCallback(async () => {
    if (photos.length === 0) {
      onNext();
      return;
    }

    setIsUploading(true);
    try {
      const newPhotos: PhotoEntry[] = [...photos];

      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        if (p instanceof File) {
          const res = await uploadAvatar(p);
          newPhotos[i] = res.url;
          revokePreviewUrl(p);
        }
      }

      updateForm({ photos: newPhotos });
      onNext();
    } catch (err) {
      console.error("Ошибка загрузки фото", err);
      alert("Не удалось загрузить одно или несколько фото. Попробуй ещё раз.");
    } finally {
      setIsUploading(false);
    }
  }, [photos, uploadAvatar, updateForm, onNext, revokePreviewUrl]);

  const isValid = photos.length > 0;

  const renderPhotoBox = (entry: PhotoEntry, index: number) => {
    const isString = typeof entry === "string";
    const src = isString ? (entry as string) : getPreviewUrl(entry as File);

    return (
      <div
        key={index}
        className="relative w-[9.25rem] h-[9.25rem] rounded-[10px] overflow-hidden
                   lg:w-[120px] lg:h-[120px]"
      >
        <img
          src={src}
          alt={`photo-${index}`}
          className="object-cover w-full h-full rounded-[10px]"
        />
        <button
          onClick={() => handleDelete(index)}
          className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white
                     lg:top-1 lg:right-1"
        >
          <div
            className="w-[2.125rem] h-[2.125rem] rounded-full bg-[#F0F0F0] flex justify-center items-center
                         lg:w-8 lg:h-8"
          >
            <img src={removePhoto} alt="x" className="lg:w-4 lg:h-4" />
          </div>
        </button>
      </div>
    );
  };

  return (
    <main className="px-2 min-h-screen lg:bg-[url(/imgs/desktop/sign-background.jpg)] bg-cover flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-between h-screen
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between
                      lg:w-[616px] lg:h-auto lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          {/* === Первый блок - заголовок и фото === */}
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0 lg:flex-1 lg:gap-10 lg:justify-center">
            {/* === Заголовок + кнопка назад === */}
            <div className="relative flex items-center justify-center w-full lg:mt-8 lg:mb-6">
              <button
                onClick={onBack}
                className="absolute left-4 top-1/2 -translate-y-1/2
                           lg:left-0 lg:w-[44px] lg:h-[44px] lg:bg-[#E1E1F3] lg:rounded-xl lg:flex lg:items-center lg:justify-center"
              >
                <img src={goBackIcon} alt="Назад" className="w-5 h-5" />
              </button>

              <h1
                className="font-semibold text-[1.55rem] leading-[2rem] text-black-heading
                             lg:text-[32px] lg:leading-[40px]"
              >
                Добавь фото
              </h1>
            </div>

            {/* === Подзаголовок === */}
            <h2 className="w-[18.2rem] font-medium text-[1.25rem] leading-[1.5rem] text-[#3D3D3D] mb-6 lg:w-full lg:mb-4">
              Выбери от 1 до 4 фото
            </h2>

            {/* === Блок с фотографиями === */}
            <section
              className="mt-[2.5rem] max-[352px]:mt-[1rem] flex flex-col items-center gap-4 w-full px-4
                               lg:mt-0 lg:flex-row lg:justify-center lg:gap-6 lg:px-0"
            >
              {/* Мобильная версия - сетка 2x2 */}
              <div className="flex flex-col gap-4 lg:hidden">
                <div className="flex gap-4">
                  {photos.length < 4 ? (
                    <button
                      onClick={handleClickAdd}
                      disabled={isUploading}
                      className="w-[9.25rem] h-[9.25rem] max-[352px]:w-[6.6rem] max-[352px]:h-[6.6rem] bg-purple-sub-button flex justify-center items-center rounded-[10px] disabled:opacity-50"
                    >
                      <img src={addPhotoImg} alt="add" />
                    </button>
                  ) : (
                    photos[3] && renderPhotoBox(photos[3], 3)
                  )}

                  {photos[0] && renderPhotoBox(photos[0], 0)}
                </div>

                <div className="flex gap-4">
                  {photos[1] && renderPhotoBox(photos[1], 1)}
                  {photos[2] && renderPhotoBox(photos[2], 2)}
                </div>
              </div>

              {/* Desktop версия - горизонтальное расположение */}
              <div className="hidden lg:flex lg:gap-6 lg:items-center lg:justify-center">
                {photos.map((photo, index) => (
                  <React.Fragment key={index}>
                    {renderPhotoBox(photo, index)}
                  </React.Fragment>
                ))}

                {photos.length < 4 && (
                  <button
                    onClick={handleClickAdd}
                    disabled={isUploading}
                    className="w-[120px] h-[120px] bg-purple-sub-button flex justify-center items-center rounded-[10px] disabled:opacity-50"
                  >
                    <img src={addPhotoImg} alt="add" className="w-10 h-10" />
                  </button>
                )}
              </div>

              {validationError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded relative max-w-md w-full mx-auto
                               lg:mt-4"
                >
                  <span className="block sm:inline">{validationError}</span>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleAddPhoto}
                className="hidden"
                ref={inputRef}
              />
            </section>
          </div>

          {/* === Второй блок - кнопка "Продолжить" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0">
            <div className="w-full lg:mt-18">
              <Continue
                handleNext={handleNext}
                isValid={isValid && !isUploading && !validationError}
                title={isUploading ? "Загрузка..." : "Продолжить"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PhotoStep;
