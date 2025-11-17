import React, { useState } from "react";
import { useChangePrivate } from "../../service/useChangePrivate";
import type { PrivateSettingsTypes } from "../../types/PrivateSettingsTypes";
import PrivateSettingsItem from "../PrivateSettingsItem/PrivateSettingsItem";

const SETTINGS_LABELS: Record<keyof PrivateSettingsTypes, string> = {
  show_username: "Имя пользователя",
  show_phone: "Телефон",
  show_age: "Возраст",
  show_city: "Город",
  show_avatar: "Аватар",
  show_goal: "Цель знакомств",
  show_max_budget: "Бюджет",
  show_occupation: "Род занятий",
  show_smoking_status: "Отношение к курению",
  show_gender: "Пол",
  show_pets: "Питомцы",
  show_religion: "Религия",
  show_about: "О себе",
  show_hashtags: "Хэштеги",
  show_url: "Ссылка",
};

type LocalState = Partial<Record<keyof PrivateSettingsTypes, boolean>>;

/**
 * Компонент больше не принимает initialSettings.
 * По умолчанию значение пункта считается false, и при клике переключается на противоположное.
 */
const PrivateSettingsList: React.FC = () => {
  const [local, setLocal] = useState<LocalState>({});
  const changePrivate = useChangePrivate();

  const handleToggle = (field: keyof PrivateSettingsTypes) => {
    // текущее локальное значение (если нет — считаем false)
    const prev = local[field] ?? false;
    const next = !prev;

    // оптимистично обновляем UI
    setLocal((s) => ({ ...s, [field]: next }));

    // отправляем на сервер; при ошибке откатим значение
    changePrivate.mutate(
      { [field]: next },
      {
        onError: () => {
          // откатываем локально к предыдущему значению
          setLocal((s) => ({ ...s, [field]: prev }));
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Настройки приватности</h2>
      {Object.entries(SETTINGS_LABELS).map(([key, label]) => {
        const k = key as keyof PrivateSettingsTypes;
        const value = local[k] ?? false; // default false if not set
        return (
          <PrivateSettingsItem
            key={key}
            label={label}
            field={k}
            value={value}
            onToggle={handleToggle}
          />
        );
      })}
    </div>
  );
};

export default PrivateSettingsList;
