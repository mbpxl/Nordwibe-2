import React from "react";
import { Check, X, ClipboardList, UserX } from "lucide-react";
import { useCompatibilityDetails } from "../../../../shared/hooks/useCompatibilityDetails";
import { setCompatibilityStyle } from "../../../SearchPage/utils/setCompatibilityStyle";
import { useNavigate } from "react-router-dom";
import { useCompletedTests } from "../../hooks/useCompletedTests";

interface CompatibilityDetailsModalProps {
  companionId: string;
  overallPercentage: number;
}

const COMPATIBILITY_TEST_ID = "cfd48889-06ca-4edf-832e-248b7ed534b2";

const questionTitles: Record<string, string> = {
  "96fbbc71-3796-4a8e-85dc-13c9df6e68af": "Обсуждение бытовых вопросов",
  "64353fec-b71b-4abf-8139-cdebcddca16f": "Отношение к курению",
  "375cd650-c2e3-4ddb-9fc0-94b2e43b32f9": "Отношение к правилам",
  "35ee02b0-17bd-4af2-8b3b-d2fac4967877": "Взаимодействие с соседом",
  "757b4fb6-007c-41d5-afa2-835ecf5c5f78": "Частота уборки",
  "73d4b230-ef0d-4691-85a9-e7df3682f992": "Отношение к грязной посуде",
  "ffffbfa8-7961-4f07-bec9-44241494ae7d": "Совместные продукты и готовка",
  "e146cc51-bc5e-47c3-9226-996c00aecdfa": "Экономия в быту",
  "6a702d2e-3ef8-4499-83f1-ca15e20338d4": "График сна",
  "64818aba-e0dd-4a45-a342-27aa3260ceff": "Уединение vs совместный досуг",
  "2bdfe8cf-ec20-4fd3-ac02-983e64461d80": "Отношение к гостям",
  "b3ba452b-2f71-4fd2-8ae2-b29ee5c6ebcb": "Реакция на бытовые конфликты",
  "818a3c42-b2bc-403c-a136-74a1310b4e16": "Решение бытовых споров",
  "5a9a33a2-4d7b-4b98-9cb2-dd8630df68a8": "Важность тишины",
  "860a3bae-4e17-4964-bc46-4e24bb74945a": "Приём гостей",
};

export const CompatibilityDetailsModal: React.FC<
  CompatibilityDetailsModalProps
> = ({ companionId, overallPercentage }) => {
  const { data, isLoading, isError } = useCompatibilityDetails(companionId);
  const { data: completedTests, isLoading: isLoadingTests } =
    useCompletedTests();
  const navigate = useNavigate();

  if (isLoading || isLoadingTests) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-main border-r-transparent"></div>
        <p className="mt-3 text-black-heading">
          Загружаем детали совместимости...
        </p>
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

  const similarTraits = data.topSimilar || [];
  const differentTraits = data.topDifferent || [];

  if (similarTraits.length === 0 && differentTraits.length === 0) {
    const hasCompletedTest = completedTests?.some(
      (test: any) => test.uuid === COMPATIBILITY_TEST_ID,
    );

    if (hasCompletedTest) {
      return (
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <UserX className="h-12 w-12 text-purple-main opacity-60" />
          <div>
            <h3 className="text-lg font-semibold text-black-heading">
              Пользователь не прошёл тест
            </h3>
            <p className="mt-1 text-gray-500 text-sm">
              Как только он пройдёт тест на совместимость, здесь появится
              статистика
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <ClipboardList className="h-12 w-12 text-purple-main opacity-60" />
        <div>
          <h3 className="text-lg font-semibold text-black-heading">
            Статистика недоступна
          </h3>
          <p className="mt-1 text-gray-500 text-sm">
            Пройдите тест на совместимость, чтобы увидеть сходства и различия
          </p>
        </div>
        <button
          onClick={() => navigate("/quiz/test")}
          className="mt-2 w-full py-3 px-4 rounded-xl bg-purple-main text-white font-medium hover:opacity-90 transition-opacity"
        >
          Пройти тест
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[352px] mx-auto lg:max-w-none lg:w-[480px] max-h-[70vh] lg:max-h-[80vh] flex flex-col">
      <div className="flex justify-center items-center gap-3 text-center mb-6">
        <h3 className="text-xl font-bold">Совместимость:</h3>
        <h3
          className={`rounded-[12px] mt-0.5 py-1 px-2 lg:py-2 lg:px-3 lg:text-nowrap text-white ${setCompatibilityStyle(
            overallPercentage,
          )}`}
        >
          {overallPercentage}%
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-5 w-5 text-green-600" />
            <h4 className="text-lg font-semibold text-black-heading">
              Чем вы схожи:
            </h4>
          </div>
          <div className="space-y-3">
            {similarTraits.length > 0 ? (
              similarTraits.map((trait: any) => (
                <div
                  key={trait.questionId}
                  className="bg-green-50 p-3 rounded-lg border border-green-100"
                >
                  <div className="font-medium text-green-800 text-sm">
                    {questionTitles[trait.questionId] || trait.questionText}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500 text-sm bg-gray-50 rounded-lg">
                Нет значительных совпадений
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <X className="h-5 w-5 text-amber-600" />
            <h4 className="text-lg font-semibold text-black-heading">
              Чем вы отличаетесь:
            </h4>
          </div>
          <div className="space-y-3">
            {differentTraits.length > 0 ? (
              differentTraits.map((trait: any) => (
                <div
                  key={trait.questionId}
                  className="bg-amber-50 p-3 rounded-lg border border-amber-100"
                >
                  <div className="font-medium text-amber-800 text-sm">
                    {questionTitles[trait.questionId] || trait.questionText}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500 text-sm bg-gray-50 rounded-lg">
                Нет значительных различий
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p>
            <strong>Как это считается?</strong> Сравниваются ваши ответы и
            ответы другого пользователя на одни и те же вопросы теста на
            совместимость.
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
