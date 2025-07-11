import { useCallback, useMemo, useRef } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import GoBackButton from "../GoBackButton";
import Heading from "../Heading";
import addPhotoImg from "/imgs/AddPhoto.png";
import removePhoto from "/icons/removePhoto.svg";
import Continue from "../../Continue/Continue";
import React from "react";

type Props = StepPropsTypes<"photos">;

const PhotoStep: React.FC<Props> = React.memo(
  ({ onBack, onNext, formData, updateForm }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const photos = useMemo(() => {
      return (formData.photos || []) as File[];
    }, [formData.photos]);

    const handleAddPhoto = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0] && photos.length < 4) {
          updateForm({ photos: [...photos, files[0]] });
        }
      },
      [photos, updateForm]
    );

    const handleDelete = useCallback(
      (index: number) => {
        const updated = [...photos];
        updated.splice(index, 1);
        updateForm({ photos: updated });
      },
      [photos, updateForm]
    );

    const handleClickAdd = useCallback(() => {
      if (photos.length < 4) {
        inputRef.current?.click();
      }
    }, [photos.length]);

    const renderPhotoBox = useCallback(
      (file: File, index: number) => {
        const previewUrl = URL.createObjectURL(file);
        return (
          <div
            key={index}
            className="relative w-[9.25rem] h-[9.25rem] rounded-[10px] overflow-hidden"
          >
            <img
              src={previewUrl}
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
      },
      [handleDelete]
    );

    const handleNext = useCallback(() => {
      onNext();
    }, [onNext]);

    const isValid = photos?.length > 0;

    return (
      <main className="pt-[1rem] min-h-screen relative">
        <div className="w-full max-w-md">
          <GoBackButton onBack={onBack} />
          <Heading
            title="Добавь фото"
            subTitle="Выбери от 1 до 4 фото"
            formData={formData}
            isCodeStep={false}
          />
        </div>

        <section className="mt-[2.5rem] flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {photos.length < 4 ? (
              <button
                onClick={handleClickAdd}
                className="w-[9.25rem] h-[9.25rem] bg-purple-sub-button flex justify-center items-center rounded-[10px]"
              >
                <img src={addPhotoImg} alt="add" />
              </button>
            ) : (
              renderPhotoBox(photos[3], 3)
            )}

            {photos[0] && renderPhotoBox(photos[0], 0)}
          </div>

          <div className="flex gap-4">
            {photos[1] && renderPhotoBox(photos[1], 1)}
            {photos[2] && renderPhotoBox(photos[2], 2)}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleAddPhoto}
            className="hidden"
            ref={inputRef}
          />
        </section>

        <section className="absolute w-full bottom-[130px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem]">
          <div className="px-7 flex flex-col gap-3">
            <Continue
              handleNext={handleNext}
              isValid={isValid}
              title={"Продолжить"}
            />
          </div>
        </section>
      </main>
    );
  }
);

export default PhotoStep;
