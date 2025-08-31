export function redirectToLogin() {
  if (window.location.pathname !== "/sign-in")
    window.location.href = "/sign-in";
}
