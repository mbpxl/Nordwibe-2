import React, { useCallback, useRef, useState } from "react";
import { useUploadAvatar } from "../../../../../shared/service/useUploadProfilePhoto";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { validateImageFile } from "../../../../../shared/utils/validateImageFile";

interface EditPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUpdate: (newPhotoUrl: string) => void;
  currentPhoto?: string;
  isMyAccount?: boolean;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoUpdate,
  currentPhoto,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadAvatar, isPending: isUploading } =
    useUploadAvatar();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setValidationError(null);

      const isValid = await validateImageFile(file);
      if (!isValid) {
        setValidationError(
          "Файл поврежден или не является валидным изображением"
        );
        event.target.value = "";
        return;
      }

      // Создаем preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    },
    []
  );

  const handleUpload = useCallback(async () => {
    if (!inputRef.current?.files?.[0]) return;

    const file = inputRef.current.files[0];

    try {
      const response = await uploadAvatar(file);
      onPhotoUpdate(response.url);
      onClose();
    } catch (error) {
      console.error("Ошибка загрузки фото:", error);
      setValidationError("Не удалось загрузить фото. Попробуйте еще раз.");
    }
  }, [uploadAvatar, onPhotoUpdate, onClose]);

  const handleClose = useCallback(() => {
    setPreviewUrl(null);
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const displayImage =
    previewUrl || (currentPhoto ? `${baseURLforImages}${currentPhoto}` : null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {currentPhoto ? "Изменить фото" : "Добавить фото"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <img src="/icons/closeModal.svg" alt="Закрыть" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          {displayImage && (
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={displayImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => inputRef.current?.click()}
            className="bg-purple-main text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Выбрать фото
          </button>

          {validationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {validationError}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleUpload}
            disabled={!previewUrl || isUploading}
            className="flex-1 bg-purple-main text-white py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? "Загрузка..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
