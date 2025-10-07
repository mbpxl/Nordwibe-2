export function clearUserData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("captcha_token");
  localStorage.removeItem("signin-form");
  localStorage.removeItem("signup-form");
  localStorage.removeItem("search_filter");
  localStorage.removeItem("about");
}

//* функция для очистки данных с прошлой сессии при входе, иначе ошибка получения access_token
export function clearAuthUserData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
