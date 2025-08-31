import type { TestsResponse } from "../types/testDataTypes";

export const testMockData: TestsResponse = [
  {
    uuid: "aaaa-aaa-aa-a",
    title: "Тест на образ жизни",
    description:
      "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
    image_url: "/imgs/quiz/quiz-img_1.jpg",
    is_important: true,
    time: 5,
    questions: [
      {
        uuid: "aaaa-aaa-11-1",
        question: "№1 Я люблю, когда в квартире часто бывают гости.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "bbbb-bbb-11-1",
        question: "№2 Мне важно, чтобы дома всегда было чисто и аккуратно.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "cccc-ccc-11-1",
        question: "№3 Мне не мешает шум (музыка, разговоры, вечеринки).",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "dddd-ddd-11-1",
        question:
          "№4 Я спокойно отношусь к тому, что мою еду могут брать без спроса.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "eeee-eee-11-1",
        question: "№5 Я чаще всего ложусь спать поздно (после полуночи).",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "ffff-fff-11-1",
        question: "№6 Я люблю обсуждать и решать бытовые вопросы вместе.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "gggg-ggg-11-1",
        question:
          "№7  Мне важно, чтобы у каждого было своё пространство и границы.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "hhhh-hhh-11-1",
        question: "№8 Мне не сложно выслушать трудности соседа.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "mmmm-mmm-11-1",
        question:
          "№9 Я не расстроюсь если мой график не совпадает с графиком соседа.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
      {
        uuid: "nnnn-nnn-11-1",
        question: "№10 Я легко подстраиваюсь под привычки других людей.",
        description:
          "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        answers: [
          { uuid: "aaaa-aaa-22-2", answer: "Полностью согласен", value: 5 },
          {
            uuid: "aaaa-aaa-33-3",
            answer: "Скорее согласен",
            value: 4,
          },
          { uuid: "aaaa-aaa-44-4", answer: "Нейтрально", value: 3 },
          {
            uuid: "aaaa-aaa-55-5",
            answer: "Скорее не согласен",
            value: 2,
          },
          { uuid: "aaaa-aaa-66-6", answer: "Полностью не согласен", value: 1 },
        ],
      },
    ],
  },
];
