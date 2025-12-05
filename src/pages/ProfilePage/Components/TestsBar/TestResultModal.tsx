interface TestResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  testTitle: string;
  resultLetter: string;
  resultDescription: string;
  resultImage?: string;
}

export const TestResultModal: React.FC<TestResultModalProps> = ({
  isOpen,
  onClose,
  testTitle,
  resultLetter,
  resultDescription,
  resultImage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[90%] max-w-md mx-4 overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-700">
                {resultLetter}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {testTitle}
            </h3>

            {resultImage && (
              <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={resultImage}
                  alt={resultDescription}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.parentElement!.style.display = "none")
                  }
                />
              </div>
            )}

            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-lg font-medium text-purple-800">
                {resultDescription}
              </p>
            </div>

            <p className="text-gray-600 mb-6 text-sm">
              Это основной тип, который проявился в ответах пользователя. Каждый
              человек уникален, но этот результат отражает ключевые
              характеристики в этом тесте.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-purple-main text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
