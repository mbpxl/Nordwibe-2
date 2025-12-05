// Статическое хранилище результатов тестов
export const TEST_RESULTS_MAPPING: any = {
  //! тест "Какой ты сосед?"
  "d28db520-e09f-4188-8bf5-42e2cadfa54f": [
    {
      letter: "А",
      description: "Тусовщик",
      imageUrl: "/results/party-animal.jpg",
    },
    {
      letter: "Б",
      description: "Домосед",
      imageUrl: "/results/homebody.jpg",
    },
    {
      letter: "В",
      description: "Лояльный сосед",
      imageUrl: "/results/loyal.jpg",
    },
    {
      letter: "Г",
      description: "Гармоничный",
      imageUrl: "/results/harmonious.jpg",
    },
    {
      letter: "Д",
      description: "Уникальный сосед",
      imageUrl: "/results/unique.jpg",
    },
  ],

  // // UUID теста "Тип личности"
  // "b2c3d4e5-6789-01fg-hijk-lmnopqrstuvw": [
  //   { letter: "А", description: "Аналитик" },
  //   { letter: "Б", description: "Дипломат" },
  //   { letter: "В", description: "Стратег" },
  //   { letter: "Г", description: "Энтузиаст" },
  //   { letter: "Д", description: "Новатор" },
  // ],

  // Добавляйте новые тесты здесь
};

// Функция-хелпер для получения результата по UUID теста и букве
export const getTestResultDescription = (
  testUuid: string,
  letter: string
): string => {
  const testResults = TEST_RESULTS_MAPPING[testUuid];
  if (!testResults) return `Результат ${letter}`;

  const result = testResults.find((r: any) => r.letter === letter);
  return result ? result.description : `Неизвестный результат ${letter}`;
};

// Функция для получения изображения результата
export const getTestResultImage = (
  testUuid: string,
  letter: string
): string | undefined => {
  const testResults = TEST_RESULTS_MAPPING[testUuid];
  return testResults?.find((r: any) => r.letter === letter)?.imageUrl;
};
