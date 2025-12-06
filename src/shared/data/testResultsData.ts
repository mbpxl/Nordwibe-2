export const TEST_RESULTS_MAPPING: Record<string, any[]> = {
  "d28db520-e09f-4188-8bf5-42e2cadfa54f": [
    {
      letter: "А",
      test_title: "Тусовщик",
      description: "Вы любите шумные компании, вечеринки и активный отдых. Для вас важны яркие впечатления и общение с большим количеством людей. Вы заряжаете окружающих своей энергией и всегда готовы к новым приключениям.",
      imageUrl: "/results/party-animal.jpg",
    },
    {
      letter: "Б",
      test_title: "Домосед",
      description: "Вы цените уют и комфорт своего дома. Предпочитаете спокойный отдых в кругу близких или в одиночестве. Для вас важна личная территория и стабильность. Вы надежный сосед, который уважает личное пространство других.",
      imageUrl: "/results/homebody.jpg",
    },
    {
      letter: "В",
      test_title: "Лояльный сосед",
      description: "Вы легко находите общий язык с разными людьми и уважаете их границы. Способны идти на компромиссы и находить взаимовыгодные решения. Для вас важны гармоничные отношения с окружающими и взаимное уважение.",
      imageUrl: "/results/loyal.jpg",
    },
    {
      letter: "Г",
      test_title: "Гармоничный",
      description: "Вы стремитесь к балансу во всех сферах жизни. Умеете сочетать активность и отдых, общение и уединение. Для вас важна гармония в отношениях и внутреннее спокойствие. Вы создаете позитивную атмосферу вокруг себя.",
      imageUrl: "/results/harmonious.jpg",
    },
    {
      letter: "Д",
      test_title: "Уникальный сосед",
      description: "Вы не боитесь быть самим собой и иметь свою точку зрения. Отличаетесь нестандартным мышлением и креативным подходом к жизни. Для вас важна свобода самовыражения и возможность реализовывать свои идеи. Вы привносите разнообразие в жизнь окружающих.",
      imageUrl: "/results/unique.jpg",
    },
  ],
};

export const getTestResultData = (
  testUuid: string,
  letter: string
): {
  test_title: string;
  description: string;
  imageUrl?: string;
} => {
  const testResults = TEST_RESULTS_MAPPING[testUuid];

  if (!testResults) {
    return {
      test_title: `Результат ${letter}`,
      description: "Подробное описание недоступно. Обратитесь в поддержку.",
      imageUrl: undefined
    };
  }

  const result = testResults.find((r: any) => r.letter === letter);

  if (!result) {
    return {
      test_title: `Неизвестный результат ${letter}`,
      description: "Описание для этого результата не найдено. Возможно, данные устарели.",
      imageUrl: undefined
    };
  }

  return {
    test_title: result.test_title,
    description: result.description,
    imageUrl: result.imageUrl
  };
};