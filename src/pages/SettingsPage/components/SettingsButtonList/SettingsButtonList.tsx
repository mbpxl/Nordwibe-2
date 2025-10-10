import type { SettingsButtonTypes } from "../SettingsButton/SettingsButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import SettingsTip from "../SettingsTip/SettingsTip";

const buttonsData: SettingsButtonTypes[] = [
  // {
  //   title: "Уведомление в Telegram-боте",
  // },
  // {
  //   title: "Сменить номер телефона",
  //   isPhoneChange: true,
  // },
  {
    title: "Настройки приватности",
    to: "/private",
  },
  // {
  //   title: "О приложении",
  //   to: "/about",
  // },
  // {
  //   title: "Часто задаваемые вопросы",
  //   to: "/faq",
  // },
  // {
  //   title: "Удалить аккаунт",
  //   isRed: true,
  // },
  {
    title: "Выйти из аккаунта",
    isRed: true,
  },
];

const SettingsButtonList = () => {
  return (
    <div className="">
      {buttonsData.map((button, index) => (
        <div className="flex items-center gap-2">
          <SettingsButton
            key={index}
            title={button.title}
            isPhoneChange={button.isPhoneChange}
            isRed={button.isRed}
            to={button.to}
          />
          {button.title == "Уведомление в Telegram-боте" ? (
            <SettingsTip />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SettingsButtonList;
