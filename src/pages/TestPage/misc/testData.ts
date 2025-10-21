import type { TestsResponse } from "../types/testDataTypes";

export const testMockData: TestsResponse = [
  {
    uuid: "aaaa-aaa-aa-a",
    title: "Тест на образ жизни",
    description:
      "Этот тест поможет оценить твой стиль жизни и привычки с точки зрения соседского сосуществования.",
    image_url: "/imgs/quiz/quiz-img_1.jpg",
    is_important: true,
    time: 5,
    questions: [
      {
        uuid: "aaaa-aaa-11-1",
        question: "№1 Я люблю гостей, пусть приходят в любое время.",
        description:
          "Этот тест поможет оценить твой стиль жизни и привычки с точки зрения соседского сосуществования.",
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
        question:
          "№2 Мне важно, чтобы дома был порядок. Без уборки – день впустую.",
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
        question:
          "№3 Шум меня не напрягает, нравятся музыка, разговоры, вечеринки.",
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
        question: "№4 Еда общая — бери, что хочешь.",
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
        question: "№5 Ночью жизнь только начинается, засыпаю под утро.",
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
        question:
          "№6 Готов обсуждать любую бытовуху, главное, поделить обязанности.",
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
        question: "№7 Каждому своё пространство, границы это святое.",
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
        question:
          "№8 Проблемы соседа - мои проблемы! Всегда готов поддержать морально!",
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
          "№9 Совпадение графиков? Да какая разница, пусть каждый живёт своей жизнью!",
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
