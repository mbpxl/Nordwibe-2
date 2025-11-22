import React, { useCallback, useEffect, useRef, useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import addPhotoImg from "/imgs/AddPhoto.png";
import removePhoto from "/icons/removePhoto.svg";
import Continue from "../../Continue/Continue";
import { useUploadAvatar } from "../../../../../shared/service/useUploadProfilePhoto";

type Props = StepPropsTypes<"photos">;
type PhotoEntry = File | string;

const validateImageFile = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(false);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(true);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    };
    
    img.src = objectUrl;
    
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    }, 2000);
  });
};

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
        setValidationError("Файл поврежден или не является валидным изображением.");
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
        className="relative w-[9.25rem] h-[9.25rem] rounded-[10px] overflow-hidden"
      >
        <img
          src={src}
          alt={`photo-${index}`}
          className="object-cover w-full h-full rounded-[10px]"
        />
        <button
          onClick={() => handleDelete(index)}
          className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white"
        >
          <div className="w-[2.125rem] h-[2.125rem] rounded-full bg-[#F0F0F0] flex justify-center items-center">
            <img src={removePhoto} alt="x" />
          </div>
        </button>
      </div>
    );
  };

  return (
    <main className="pt-[1rem] min-h-screen relative">
      <div className="w-full max-w-md m-auto">
        <GoBackButton onBack={onBack} />
        <Heading title="Добавь фото" subTitle="Выбери от 1 до 4 фото" />
      </div>

      <section className="mt-[2.5rem] max-[352px]:mt-[1rem] flex flex-col items-center gap-4">

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

        {validationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded relative max-w-md w-full mx-auto">
            <span className="block sm:inline">{validationError}</span>
          </div>
        )}

        <div className="flex gap-4">
          {photos[1] && renderPhotoBox(photos[1], 1)}
          {photos[2] && renderPhotoBox(photos[2], 2)}
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleAddPhoto}
          className="hidden"
          ref={inputRef}
        />
      </section>

      <section
        className={`fixed left-1/2 transform -translate-x-1/2 ${
          photos.length > 1 ? "bottom-5" : "bottom-[108px]"
        } w-[320px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem]`}
      >
        <div className="px-7 flex flex-col gap-3">
          <Continue
            handleNext={handleNext}
            isValid={isValid && !isUploading && !validationError}
            title={isUploading ? "Загрузка..." : "Продолжить"}
          />
        </div>
      </section>
    </main>
  );
};

export default PhotoStep;