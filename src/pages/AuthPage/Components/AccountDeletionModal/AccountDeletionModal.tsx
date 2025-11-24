import React from "react";
import Modal from "../../../../shared/Components/Modal/Modal";

interface AccountDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDeletionModal: React.FC<AccountDeletionModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="text-center p-6">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-yellow-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Аккаунт недавно удален
          </h2>
        </div>

        <div className="text-gray-600 mb-6">
          <p className="mb-2">
            Вы недавно удалили свой аккаунт. Системе требуется некоторое время
            для полной обработки этого действия.
          </p>
          <p className="font-medium text-purple-main">
            Пожалуйста, подождите перед созданием нового аккаунта.
          </p>
          <p className="text-sm mt-3">
            Если проблема сохраняется, попробуйте войти позже или обратитесь в
            службу поддержки.
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-purple-main text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
        >
          Окей
        </button>
      </div>
    </Modal>
  );
};
