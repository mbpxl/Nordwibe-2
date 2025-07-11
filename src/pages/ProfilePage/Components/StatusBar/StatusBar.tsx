/* eslint-disable @typescript-eslint/no-explicit-any */

import Status from "../../../../shared/Components/Status/Status";

const habbits = [
  {
    icon: "/icons/status/status-smoking.svg",
    title: "Курю",
  },
  {
    icon: "/icons/status/status-alarm.svg",
    title: "Встаю рано",
  },
  {
    icon: "/icons/status/status-pets.svg",
    title: "Нет животных",
  },
  {
    icon: "/icons/status/status-hoping.svg",
    title: "Атеизм",
  },
  {
    icon: "/icons/status/status-job.svg",
    title: "Профессия - Дизайнер",
  },
  {
    icon: "/icons/status/status-money.svg",
    title: "Бюджет - Не больше 30.000 в месяц",
  },
];

const StatusBar = () => {
  return (
    <>
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3 mb-2">
        Хештеги
      </h1>
      <div className="flex flex-wrap gap-x-3">
        {habbits.map((item: any) => (
          <Status imgSrc={item.icon} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default StatusBar;
