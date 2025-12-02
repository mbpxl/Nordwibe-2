export const formatMessageTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "только что";
  } else if (diffMins < 60) {
    return `${diffMins} мин`;
  } else if (diffHours < 24) {
    return `${diffHours} ч`;
  } else if (diffDays < 7) {
    return `${diffDays} д`;
  } else {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};

export const formatDesktopTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
