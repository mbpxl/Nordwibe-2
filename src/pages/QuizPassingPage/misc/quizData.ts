import type { QuizessTypes } from "../types/quizDataTypes";

export const mockQuizzes: QuizessTypes = [
  {
    uuid: "11111111-1111-1111-1111-111111111111",
    title: "Аренда без рисков",
    description: "Научитесь находить квартиру, которая идеально вам подходит",
    image_url: "/imgs/quiz/quiz-img_1.jpg",
		isCompleted: false,
		time: "5",
    lessons: [
      {
        uuid: "aaa11111-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "Определите бюджет и приоритеты",
        text: `Прежде чем начинать поиски квартиры, определите бюджет и приоритеты: транспортная доступность, инфраструктура и безопасность. Исследуйте несколько районов, сравните цены и отзывы жильцов в интернете. Обратите внимание на сезонность рынка: летом и перед началом учебного года спрос выше, а цены могут расти.`,
        image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
      },
      {
        uuid: "aaa22222-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "Проверка документов",
        text: `Перед подписанием договора убедитесь в юридической чистоте квартиры. Запросите выписку из ЕГРН, проверьте наличие обременений и задолженностей. При необходимости привлеките юриста или риелтора.`,
        image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
      },
      {
        uuid: "aaa33333-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "Заключение сделки",
        text: `Согласуйте дату и условия передачи квартиры. Подготовьте все необходимые документы и средства оплаты. Подпишите договор купли-продажи или аренды и зарегистрируйте сделку в Росреестре.`,
        image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
      }
    ],
    quiz: [
      {
        uuid: "bbb11111-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        title: "Тест по поиску квартиры",
        description: "Проверьте, насколько хорошо вы усвоили материал",
        image_url: "/imgs/quiz/quiz-img_1.jpg",
        questions: [
          {
            uuid: "ccc11111-cccc-cccc-cccc-cccccccccccc",
            question: "Что нужно сделать в первую очередь перед поиском квартиры?",
            description: "",
            image_url: "/images/question1.jpg",
            answers: [
              {
                uuid: "ddd11111-dddd-dddd-dddd-dddddddddddd",
                answer: "Определить бюджет и приоритеты",
                is_correct: true
              },
              {
                uuid: "ddd22222-dddd-dddd-dddd-dddddddddddd",
                answer: "Начать просматривать объявления",
                is_correct: false
              },
              {
                uuid: "ddd33333-dddd-dddd-dddd-dddddddddddd",
                answer: "Сразу поехать смотреть квартиры",
                is_correct: false
              }
            ]
          },
          {
            uuid: "ccc22222-cccc-cccc-cccc-cccccccccccc",
            question: "Когда спрос на жильё обычно выше?",
            description: "",
            image_url: "/images/question2.jpg",
            answers: [
              {
                uuid: "ddd44444-dddd-dddd-dddd-dddddddddddd",
                answer: "Летом и перед началом учебного года",
                is_correct: true
              },
              {
                uuid: "ddd55555-dddd-dddd-dddd-dddddddddddd",
                answer: "Зимой",
                is_correct: false
              },
              {
                uuid: "ddd66666-dddd-dddd-dddd-dddddddddddd",
                answer: "В январе",
                is_correct: false
              }
            ]
          },
        ]
      }
    ]
  },
	{
  uuid: "22222222-2222-2222-2222-222222222222",
  title: "Гайд по взрослой жизни",
  description: "Проверьте свои знания об основных шагах и подводных камнях при аренде жилья - от выбора до оформления документов",
  image_url: "/imgs/quiz/quiz-img_2.jpg",
  isCompleted: false,
  time: "5",
  lessons: [
    {
      uuid: "bbb11111-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      title: "Финансовая подушка и бюджет",
      text: `Первый шаг к финансовой стабильности — создать резервный фонд, который покроет ваши расходы хотя бы на 3-6 месяцев. Это поможет справиться с непредвиденными ситуациями: потерей работы или срочными тратами. Составьте бюджет: фиксируйте доходы и расходы, чтобы видеть, куда уходят деньги.`,
      image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
    },
    {
      uuid: "bbb22222-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      title: "Бытовые навыки",
      text: `Базовые бытовые умения — это основа комфортной жизни. Научитесь готовить несколько простых, но питательных блюд, ухаживать за одеждой и поддерживать чистоту в доме. Понимайте, как пользоваться бытовой техникой, и не бойтесь мелкого ремонта: заменить лампочку, почистить слив или повесить полку.`,
      image_url: "/imgs/quiz-passing/quiz-passing-2.jpg",
    },
    {
      uuid: "bbb33333-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      title: "Документы и ответственность",
      text: `Следите за актуальностью своих документов: паспорт, медицинская страховка, водительское удостоверение и другие. Понимайте, как работают налоги и страхование, даже если у вас есть бухгалтер — это снизит риск ошибок и штрафов. Чётко соблюдайте договорённости и сроки — это формирует доверие и репутацию, которая поможет в будущем.`,
      image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
    }
  ],
  quiz: [
    {
      uuid: "cccc11111-cccc-cccc-cccc-cccccccccccc",
      title: "Тест по гайду взрослой жизни",
      description: "Проверьте, насколько вы готовы к самостоятельной жизни",
      image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
      questions: [
        {
          uuid: "ddd11111-dddd-dddd-dddd-dddddddddddd",
          question: "Какой рекомендуемый размер финансовой подушки безопасности?",
          description: "",
          image_url: "/images/question1.jpg",
          answers: [
            {
              uuid: "eee11111-eeee-eeee-eeee-eeeeeeeeeeee",
              answer: "На 3-6 месяцев расходов",
              is_correct: true
            },
            {
              uuid: "eee22222-eeee-eeee-eeee-eeeeeeeeeeee",
              answer: "На 1 месяц расходов",
              is_correct: false
            },
            {
              uuid: "eee33333-eeee-eeee-eeee-eeeeeeeeeeee",
              answer: "Не имеет значения",
              is_correct: false
            }
          ]
        },
        {
          uuid: "ccc22222-cccc-cccc-cccc-cccccccccccc",
          question: "Что из этого относится к бытовым навыкам?",
          description: "",
          image_url: "/images/question2.jpg",
          answers: [
            {
              uuid: "ddd44444-dddd-dddd-dddd-dddddddddddd",
              answer: "Готовка, уборка, мелкий ремонт",
              is_correct: true
            },
            {
              uuid: "ddd55555-dddd-dddd-dddd-dddddddddddd",
              answer: "Только готовка",
              is_correct: false
            },
            {
              uuid: "ddd66666-dddd-dddd-dddd-dddddddddddd",
              answer: "Только уборка",
              is_correct: false
            }
          ]
        }
      ]
    }
  ]
	},
	{
  uuid: "33333333-3333-3333-3333-333333333333",
  title: "Совместная жизнь",
  description: "Узнайте об основных правилах при совместной жизни с кем-либо",
  image_url: "/imgs/quiz/quiz-img_3.jpg",
  isCompleted: false,
  time: "15",
  lessons: [
    {
      uuid: "ccc11111-cccc-cccc-cccc-cccccccccccc",
      title: "Общение и честность",
      text: `Открытое и честное общение помогает избежать недопониманий и конфликтов. Обсуждайте важные вопросы, делитесь своими чувствами и слушайте партнёра. Не копите раздражение — лучше сразу говорить о том, что вас беспокоит, в спокойной форме.`,
      image_url: "/imgs/quiz-passing/quiz-passing-2.jpg",
    },
    {
      uuid: "ccc22222-cccc-cccc-cccc-cccccccccccc",
      title: "Распределение обязанностей",
      text: `Домашние дела должны распределяться так, чтобы нагрузка была справедливой для всех. Составьте список задач и определите, кто за что отвечает. Меняйтесь обязанностями, если кто-то временно не может выполнять свою часть, и уважайте вклад друг друга.`,
      image_url: "/imgs/quiz-passing/quiz-passing-1.jpg",
    },
    {
      uuid: "ccc33333-cccc-cccc-cccc-cccccccccccc",
      title: "Личное пространство",
      text: `Даже при совместной жизни важно сохранять личное пространство и время для себя. Уважайте границы друг друга и не навязывайтесь, если человек хочет побыть один. Наличие личных интересов и хобби помогает сохранить баланс и избегать конфликтов.`,
      image_url: "/imgs/quiz-passing/quiz-passing-2.jpg",
    }
  ],
  quiz: [
    {
      uuid: "ddd11111-dddd-dddd-dddd-dddddddddddd",
      title: "Тест по правилам совместной жизни",
      description: "Проверьте, насколько вы готовы к жизни с другими людьми",
      image_url: "/images/test-cover.jpg",
      questions: [
        {
          uuid: "eee11111-eeee-eeee-eeee-eeeeeeeeeeee",
          question: "Почему важно открыто общаться при совместной жизни?",
          description: "",
          image_url: "/images/question1.jpg",
          answers: [
            {
              uuid: "fff11111-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы избежать недопониманий и конфликтов",
              is_correct: true
            },
            {
              uuid: "fff22222-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы казаться умнее",
              is_correct: false
            },
            {
              uuid: "fff33333-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы заполнить тишину",
              is_correct: false
            }
          ]
        },
        {
          uuid: "eee22222-eeee-eeee-eeee-eeeeeeeeeeee",
          question: "Что поможет сделать распределение домашних обязанностей честным?",
          description: "",
          image_url: "/images/question2.jpg",
          answers: [
            {
              uuid: "fff44444-ffff-ffff-ffff-ffffffffffff",
              answer: "Составить список задач и определить, кто за что отвечает",
              is_correct: true
            },
            {
              uuid: "fff55555-ffff-ffff-ffff-ffffffffffff",
              answer: "Делать всё самому",
              is_correct: false
            },
            {
              uuid: "fff66666-ffff-ffff-ffff-ffffffffffff",
              answer: "Делать дела, когда есть настроение",
              is_correct: false
            }
          ]
        },
        {
          uuid: "eee33333-eeee-eeee-eeee-eeeeeeeeeeee",
          question: "Почему важно сохранять личное пространство?",
          description: "",
          image_url: "/images/question3.jpg",
          answers: [
            {
              uuid: "fff77777-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы сохранять баланс и избегать конфликтов",
              is_correct: true
            },
            {
              uuid: "fff88888-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы тратить меньше времени на уборку",
              is_correct: false
            },
            {
              uuid: "fff99999-ffff-ffff-ffff-ffffffffffff",
              answer: "Чтобы казаться занятым",
              is_correct: false
            }
          ]
        }
      ]
    }
  ]
  },
];
