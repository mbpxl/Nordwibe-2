import type { statusDataTypes } from "../types/statusDataTypes";

export const statusConfig: Record<
  keyof statusDataTypes,
  (value: any) => { icon: string; title: string }
> = {
  smoking_status: (value) => ({
    icon: "/icons/status/status-smoking.svg",
    title: `Курение: ${value}`,
  }),
  pets: (value) => ({
    icon: "/icons/status/status-pets.svg",
    title: `Животные: ${value}`,
  }),
  religion: (value) => ({
    icon: "/icons/status/status-religion.svg",
    title: `Религия: ${value}`,
  }),
  hometown_name: (value) => ({
    icon: "/icons/status/status-hometown.svg",
    title: `Родной город: ${value}`,
  }),
  max_budget: (value) => ({
    icon: "/icons/status/status-money.svg",
    title: `Бюджет: до ${value.toLocaleString("ru-RU")} ₽`,
  }),
  desired_length: (value) => ({
    icon: "/icons/status/status-alarm.svg",
    title: `Срок проживания: ${value}`,
  }),
};
