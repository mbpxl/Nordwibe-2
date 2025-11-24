import React from "react";
import { motion } from "framer-motion";

interface PhotoActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
  hasPhoto: boolean;
}

export const PhotoActionsMenu: React.FC<PhotoActionsMenuProps> = ({
  isOpen,
  onClose,
  onOpen,
  onEdit,
  onDelete,
  hasPhoto,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xs mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2">
          {hasPhoto && (
            <>
              <button
                onClick={() => {
                  onOpen();
                  onClose();
                }}
                className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Открыть
              </button>
              <div className="h-px bg-gray-200 mx-4" />
            </>
          )}

          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {hasPhoto ? "Изменить" : "Добавить фото"}
          </button>

          {hasPhoto && (
            <>
              <div className="h-px bg-gray-200 mx-4" />
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors text-red-600"
              >
                Удалить
              </button>
            </>
          )}
        </div>

        <div className="h-px bg-gray-200" />
        <button
          onClick={onClose}
          className="w-full text-left p-4 hover:bg-gray-50 rounded-b-2xl transition-colors"
        >
          Отмена
        </button>
      </motion.div>
    </div>
  );
};
