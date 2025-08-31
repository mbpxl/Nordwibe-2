export type FillProfileRequest = {
  username: string | null;
  name: string | null;
  birth_date: string | null;
  usage_goal:
    | "Поиск соседа"
    | "Поиск жилья"
    | "Сдать жильё"
    | "Поиск комнаты"
    | null
    | undefined;
  desired_length: string | null;
  chronotype: string | null;
  max_budget: number | null;
  occupation: "Студент" | "Работает" | "Не работает" | null | undefined;
  smoking_status: string | null;
  gender: "Женский" | "Мужской" | null | undefined;
  pets: string | null;
  religion:
    | "Нейтрально"
    | "Христианство"
    | "Ислам"
    | "Иидуизм"
    | "Буддизм"
    | "Атеизм"
    | null
    | undefined;
  about: string | null;
  ready_for_smalltalk: boolean;
  city_id: string | null;
  hometown_id: string | null;
  hashtags_ids: string[] | null;
};
