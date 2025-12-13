import React from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCompatibilityDetails } from '../../../../shared/hooks/useCompatibilityDetails';
import { setCompatibilityStyle } from '../../../SearchPage/utils/setCompatibilityStyle';

interface CompatibilityDetailsModalProps {
  companionId: string;
  overallPercentage: number;
}

export const CompatibilityDetailsModal: React.FC<CompatibilityDetailsModalProps> = ({
  companionId,
  overallPercentage,
}) => {
  const { data, isLoading, isError } = useCompatibilityDetails(companionId);
  const [expandedSections, setExpandedSections] = React.useState({
    similar: true,
    different: true,
  });

  const toggleSection = (section: 'similar' | 'different') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-main border-r-transparent"></div>
        <p className="mt-3 text-black-heading">Загружаем детали совместимости...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-600">
        <X className="mx-auto h-12 w-12" />
        <h3 className="mt-3 text-lg font-semibold">Произошла ошибка</h3>
        <p className="mt-1">Не удалось загрузить подробную статистику</p>
      </div>
    );
  }

  const { similarTraits, differentTraits } = data;

  return (
    <div className="w-full max-w-[352px] mx-auto lg:max-w-none lg:w-[480px] max-h-[70vh] lg:max-h-[80vh] flex flex-col">
      <div className="flex justify-center items-center gap-3 text-center mb-4">
        <h3 className="text-xl font-bold">Совместимость: </h3>
        <h3 className={`rounded-[12px] mt-0.5 py-1 px-2 lg:py-2 lg:px-3 lg:text-nowrap text-white ${setCompatibilityStyle(overallPercentage)}`}>{overallPercentage}%</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <div className="mb-6">
          <button
            onClick={() => toggleSection('similar')}
            className="flex items-center justify-between w-full p-3 bg-green-50 rounded-lg border border-green-100 mb-2 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold text-black-heading max-[335px]:text-[15px]">
                Чем вы схожи
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({similarTraits.length})
                </span>
              </h4>
            </div>
            {expandedSections.similar ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.similar && (
            <div className="space-y-3">
              {similarTraits.length > 0 ? (
                similarTraits.map((trait) => (
                  <div key={trait.questionId} className="bg-green-50/50 p-3 rounded-lg border border-green-100">
                    <p className="font-medium text-gray-900 text-sm mb-2">{trait.questionText}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start">
                        <span className="font-medium text-green-700 min-w-[40px]">Вы:</span>
                        <span className="text-green-700 break-words flex-1 ml-2">{trait.myAnswer}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-green-700 min-w-[40px]">Пользователь:</span>
                        <span className="text-green-700 break-words flex-1 ml-2">{trait.theirAnswer}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm bg-gray-50 rounded-lg">
                  Нет значительных совпадений по ответам
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection('different')}
            className="flex items-center justify-between w-full p-3 bg-amber-50 rounded-lg border border-amber-100 mb-2 hover:bg-amber-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <X className="h-5 w-5 text-amber-600" />
              <h4 className="text-lg font-semibold text-black-heading max-[335px]:text-[15px]">
                Чем вы отличаетесь
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({differentTraits.length})
                </span>
              </h4>
            </div>
            {expandedSections.different ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.different && (
            <div className="space-y-3">
              {differentTraits.length > 0 ? (
                differentTraits.map((trait) => (
                  <div key={trait.questionId} className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                    <p className="font-medium text-gray-900 text-sm mb-2">{trait.questionText}</p>
                    <div className="space-y-2 text-xs mb-1">
                      <div className="flex items-start">
                        <span className="font-medium text-amber-700 min-w-[40px]">Вы:</span>
                        <span className="text-amber-700 break-words flex-1 ml-2">{trait.myAnswer}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-amber-700 min-w-[40px]">Пользователь:</span>
                        <span className="text-amber-700 break-words flex-1 ml-2">{trait.theirAnswer}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm bg-gray-50 rounded-lg">
                  Нет значительных различий по ответам
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p>
            <strong>Как это считается?</strong> Сравниваются ваши ответы и ответы другого пользователя на одни и те же вопросы теста на совместимость. Чем меньше разница в баллах — тем больше вы схожи.
          </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c7d2fe #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #c7d2fe;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};