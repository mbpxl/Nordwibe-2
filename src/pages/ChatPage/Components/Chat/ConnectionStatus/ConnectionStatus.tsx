import { useState, useEffect } from "react";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [lastNotificationTime, setLastNotificationTime] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const now = Date.now();
      // Показываем уведомление не чаще, чем раз в 10 секунд
      if (now - lastNotificationTime > 10000) {
        setShowNotification(true);
        setLastNotificationTime(now);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [lastNotificationTime]);

  if (!showNotification) return null;

  return (
    <div
      className={`px-4 py-2 text-center text-sm transition-all duration-300 ${
        isOnline
          ? "bg-green-50 text-green-700 border-b border-green-100"
          : "bg-red-50 text-red-700 border-b border-red-100"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Чат подключен</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Нет подключения к интернету</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
