export type FillProfileRequest = {
  username: string | null;
  phone: string;
  name: string;
  usage_goal: "Поиск соседа" | "Поиск жилья" | "Сдать жильё" | "Поиск комнаты" | null | undefined;
  max_budget: number | null;
  occupation: "Студент" | "Работает" | "Не работает" | null | undefined;
  smoking_status: "Редко" | "Часто" | "Вейп" | "Нейтрально" | "Аллергия" | null | undefined;
  gender: "Женский" | "Мужской" | null | undefined;
  pets: "Аллергия" | "Есть" | "Нет" | null | undefined;
  religion: "Нейтрально" | "Христианство" | "Ислам" | "Индуизм" | "Буддизм" | "Атеизм" | null | undefined;
  about: string | null;
  ready_for_smalltalk: boolean;
  birth_date: string;
  city_id: string | null;
  hashtags: string[] | null;
}