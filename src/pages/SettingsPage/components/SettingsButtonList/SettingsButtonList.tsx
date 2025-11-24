import type { SettingsButtonTypes } from "../SettingsButton/SettingsButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import SettingsTip from "../SettingsTip/SettingsTip";

const buttonsData: SettingsButtonTypes[] = [
  {
    title: "Настройки приватности",
    to: "/private",
  },
  {
    title: "Выйти из аккаунта",
    isRed: true,
  },
  {
    title: "Удалить аккаунт",
    isRed: true,
  },
];

const SettingsButtonList = () => {
  return (
    <div className="">
      {buttonsData.map((button, index) => (
        <div className="flex items-center gap-2" key={index}>
          <SettingsButton
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
