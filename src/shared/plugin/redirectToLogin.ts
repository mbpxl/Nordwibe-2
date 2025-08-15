export function redirectToLogin() {
  console.log(window.location.pathname);
  if (window.location.pathname !== "/sign-in") window.location.href = "/sign-in";
}