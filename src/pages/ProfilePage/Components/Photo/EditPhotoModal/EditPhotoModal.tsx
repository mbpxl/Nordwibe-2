import React, { useCallback, useRef, useState, useEffect } from "react";
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

// Функция для компрессии изображения
const compressImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.8,
  format: string = "webp"
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Рассчитываем новые размеры с сохранением пропорций
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Настройка качества рендеринга
      if (ctx) {
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
      }

      // Конвертируем в выбранный формат
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Не удалось сжать изображение"));
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
    img.src = URL.createObjectURL(file);
  });
};

// Функция для определения поддерживаемых форматов браузером
const getSupportedFormat = (): string => {
  const canvas = document.createElement("canvas");
  if (canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0) {
    return "webp";
  }
  return "jpeg";
};

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
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  //@ts-ignore
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
  } | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);

  // Инициализация текущего фото при открытии модального окна
  useEffect(() => {
    if (isOpen && currentPhoto) {
      setCurrentPhotoUrl(`${baseURLforImages}${currentPhoto}`);
    } else {
      setCurrentPhotoUrl(null);
    }
  }, [isOpen, currentPhoto]);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setValidationError(null);
      setOriginalFile(file);
      setCompressedFile(null);
      setCompressionStats(null);

      const isValid = await validateImageFile(file);
      if (!isValid) {
        setValidationError(
          "Файл поврежден или не является валидным изображением"
        );
        event.target.value = "";
        return;
      }

      try {
        setIsCompressing(true);

        // Сразу показываем быстрый превью из оригинального файла
        const quickPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(quickPreviewUrl);

        // Затем компрессируем изображение в фоне
        const supportedFormat = getSupportedFormat();
        const compressedBlob = await compressImage(
          file,
          800, // maxWidth
          800, // maxHeight
          0.7, // quality (более агрессивное сжатие для аватарок)
          supportedFormat
        );

        // Создаем File из Blob
        const compressedFile = new File(
          [compressedBlob],
          `avatar.${supportedFormat}`,
          {
            type: `image/${supportedFormat}`,
            lastModified: Date.now(),
          }
        );

        setCompressedFile(compressedFile);

        // Статистика компрессии
        const originalSize = file.size;
        const compressedSize = compressedBlob.size;
        const reduction =
          ((originalSize - compressedSize) / originalSize) * 100;

        setCompressionStats({
          originalSize,
          compressedSize,
          reduction,
        });

        // Заменяем быстрое превью на сжатое
        const compressedPreviewUrl = URL.createObjectURL(compressedBlob);
        setPreviewUrl(compressedPreviewUrl);

        // Освобождаем память от быстрого превью
        URL.revokeObjectURL(quickPreviewUrl);
      } catch (error) {
        console.error("Ошибка компрессии:", error);
        setValidationError(
          "Не удалось обработать изображение. Попробуйте другой файл."
        );

        // В случае ошибки оставляем быстрое превью
        setCompressedFile(file);
      } finally {
        setIsCompressing(false);
      }
    },
    []
  );

  const handleUpload = useCallback(async () => {
    const fileToUpload = compressedFile || originalFile;
    if (!fileToUpload) return;

    try {
      const response = await uploadAvatar(fileToUpload);
      onPhotoUpdate(response.url);
      onClose();
    } catch (error) {
      console.error("Ошибка загрузки фото:", error);
      setValidationError("Не удалось загрузить фото. Попробуйте еще раз.");
    }
  }, [compressedFile, originalFile, uploadAvatar, onPhotoUpdate, onClose]);

  const handleClose = useCallback(() => {
    // Очищаем временные URL (только blob URL)
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setValidationError(null);
    setOriginalFile(null);
    setCompressedFile(null);
    setCompressionStats(null);
    setIsCompressing(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  }, [onClose, previewUrl]);

  // Форматирование размера файла
  //@ts-ignore
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen) return null;

  // Определяем какое изображение показывать
  const displayImage = previewUrl || currentPhotoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {currentPhoto ? "Изменить фото" : "Добавить фото"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <img src="/icons/closeModal.svg" alt="Закрыть" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          {displayImage && (
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                <img
                  src={displayImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
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
            disabled={isCompressing}
            className="bg-purple-main text-white px-6 py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCompressing ? "Сжатие..." : "Выбрать фото"}
          </button>

          {validationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm w-full">
              {validationError}
            </div>
          )}

          {/* Подсказка о качестве */}
          <div className="text-xs text-gray-500 text-center">
            Изображение будет автоматически сжато до оптимального размера
          </div>
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
            disabled={!previewUrl || isUploading || isCompressing}
            className="flex-1 bg-purple-main text-white py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? "Загрузка..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
