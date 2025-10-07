export function redirectToLogin() {
  if (window.location.pathname !== "/welcome")
    window.location.href = "/welcome";
}
