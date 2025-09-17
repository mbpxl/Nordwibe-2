export function clearUserData(isPreLogin?: boolean) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("search_filter");
  localStorage.removeItem("about");
  if (isPreLogin) {
    localStorage.removeItem("captcha_token");
    localStorage.removeItem("signin-form");
    localStorage.removeItem("signup-form");
  }
}
