export function clearUserData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("signin-form");
  localStorage.removeItem("signup-form");
  localStorage.removeItem("search_filter");
}
